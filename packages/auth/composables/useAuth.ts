import type { registerUserSchema } from '@serp/db/validations/auth';
import type { FetchError } from 'ofetch';
import type { z } from 'zod';
import type { AuthError } from '../server/utils/auth';

type RegisterUserSchema = z.output<typeof registerUserSchema>;

interface AuthResponse {
  error?: AuthError;
  success?: boolean;
  emailVerified?: boolean;
}

export function useAuth(): {
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (userData: RegisterUserSchema) => Promise<AuthResponse>;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (token: string, password: string) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<AuthResponse>;
} {
  const toast = useToast();
  const { fetch: refreshSession, clear } = useUserSession();

  const resendVerification = async (email: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/resend-verification', {
        method: 'POST',
        body: { email },
      });
      toast.add({
        title: 'Verification email sent',
        description: 'Please check your email for the verification link.',
        color: 'success',
        duration: 5000,
      });
      return { success: true };
    } catch {
      toast.add({
        title: 'Failed to send verification email',
        color: 'error',
      });
      return {
        error: {
          statusCode: 500,
          statusMessage: 'Failed to send verification email',
        },
      };
    }
  };

  const handleAuthError = (error: FetchError<AuthError>): void => {
    const errorMessage = error.statusMessage || 'An unexpected error occurred';
    const statusCode = error.data?.statusCode;

    // Check if this is an unverified email error
    if (error.data?.needsVerification) {
      const email = error.data.email;

      // Add toast with action button
      toast.add({
        title: 'Email not verified',
        description: 'This email is registered but not verified.',
        actions: [
          {
            label: 'Resend Verification Email',
            onClick: async () => {
              if (email) {
                await resendVerification(email);
              }
            },
          },
        ],
      });
    } else {
      // Regular error toast
      toast.add({
        title: 'Error',
        description: errorMessage,
        color: 'error',
      });
    }

    return {
      error: {
        statusMessage: errorMessage,
        statusCode,
        data: error.data,
      } as AuthError,
    };
  };

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/login', {
        method: 'POST',
        body: credentials,
      });
      await refreshSession();
      toast.add({ title: 'Logged in successfully', color: 'success' });
      return { success: true };
    } catch (error) {
      return handleAuthError(error as FetchError<AuthError>);
    }
  };

  const logout = async (): Promise<void> => {
    await clear();
    useState('teamSlug').value = '';
    useState('teams').value = [];
  };

  const register = async (
    userData: RegisterUserSchema,
  ): Promise<AuthResponse> => {
    try {
      const user = await $fetch('/api/auth/password/register', {
        method: 'POST',
        body: userData,
      });
      return { success: true, emailVerified: user.emailVerified };
    } catch (error) {
      return handleAuthError(error as FetchError<AuthError>);
    }
  };

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/forgot', {
        method: 'POST',
        body: { email },
      });
      toast.add({
        title:
          'If the email is correct, you will receive a password reset link.',
        color: 'success',
      });
      return { success: true };
    } catch (error) {
      return handleAuthError(error as FetchError);
    }
  };

  const resetPassword = async (
    password: string,
    token: string,
  ): Promise<AuthResponse> => {
    try {
      await $fetch('/api/auth/password/reset', {
        method: 'POST',
        body: { password, token },
      });
      toast.add({
        title: 'Password reset successfully',
        color: 'success',
      });
      return { success: true };
    } catch (error) {
      return handleAuthError(error as FetchError);
    }
  };

  return {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    resendVerification,
  };
}

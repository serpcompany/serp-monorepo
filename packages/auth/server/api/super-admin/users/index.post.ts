import { saveEmailVerificationCode } from '@serp/db/server/database/queries/auth';
import {
  createUserWithPassword,
  findUserByEmail,
} from '@serp/db/server/database/queries/users';
import {
  generateAlphaNumericCode,
  sendEmail,
  validateBody,
} from '@serp/utils/server';
import { render } from '@vue-email/render';
import { z } from 'zod';
import EmailVerification from '../../../../emails/email-verification.vue';
import { sanitizeUser } from '../../../utils/auth';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  emailVerified: z.boolean().optional(),
  avatarUrl: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      'Phone number must be in E.164 format (e.g. +12125551234)',
    )
    .optional(),
});

export default defineEventHandler(async (event) => {
  // Verify that the requester is a super admin
  const { user } = await requireUserSession(event);
  if (!user.superAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to access this resource',
    });
  }

  // Validate the request body
  const data = await validateBody(event, schema);

  // Check if user already exists
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A user with this email already exists',
    });
  }

  // Hash the password
  const hashedPassword = await hashPassword(data.password);

  // Create the user
  const newUser = await createUserWithPassword({
    email: data.email,
    name: data.name,
    hashedPassword,
    emailVerified: data.emailVerified || false,
    avatarUrl: data.avatarUrl,
    phoneNumber: data.phoneNumber,
  });

  // If email verification is not auto-enabled, send verification email
  if (!data.emailVerified) {
    const emailVerificationCode = generateAlphaNumericCode(32);

    await saveEmailVerificationCode({
      userId: newUser.id,
      code: emailVerificationCode,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    });

    const htmlTemplate = await render(EmailVerification, {
      verificationCode: emailVerificationCode,
    });

    if (process.env.MOCK_EMAIL) {
      console.table({
        email: data.email,
        name: data.name,
        verificationLink: `${process.env.NUXT_PUBLIC_URL}/api/auth/verify-account?token=${emailVerificationCode}`,
      });
    } else {
      await sendEmail({
        subject: `Welcome to ${process.env.NUXT_PUBLIC_SITE_NAME}`,
        to: data.email,
        html: htmlTemplate,
      });
    }
  }

  setResponseStatus(event, 201);
  return sanitizeUser(newUser);
});

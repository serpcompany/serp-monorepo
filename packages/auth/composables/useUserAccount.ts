import type { User } from '@serp/db/types/database'
import { z } from 'zod'

export function useUserAccount(): {
  loading: Ref<boolean>
  updateUser: (userData: Partial<z.infer<typeof schema>>) => Promise<void>
  updatePassword: (password: string) => Promise<void>
} {
  const toast = useToast()
  const loading = ref(false)
  const schema = z.object({
    avatarUrl: z.string().optional(),
    name: z.string().min(1),
  })

  const passwordSchema = z.object({
    password: z.string().min(8),
  })

  const updateUser = async (
    userData: Partial<z.infer<typeof schema>>,
  ): Promise<void> => {
    loading.value = true
    try {
      await $fetch<User>('/api/me', {
        method: 'PATCH',
        body: userData,
      })
      toast.add({
        title: 'Your account has been updated successfully',
        color: 'success',
      })
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to update your account',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  const updatePassword = async (password: string): Promise<void> => {
    loading.value = true
    try {
      await $fetch('/api/me/update-password', {
        method: 'POST',
        body: { password },
      })
      toast.add({
        title: 'Your password has been updated successfully',
        color: 'success',
      })
    }
    catch (error) {
      console.error(error)
      toast.add({
        title: 'Failed to update your password',
        color: 'error',
      })
    }
    finally {
      loading.value = false
    }
  }

  return {
    loading,
    updateUser,
    updatePassword,
    schema,
    passwordSchema,
  }
}

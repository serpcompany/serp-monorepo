import { FetchError } from 'ofetch'

export function usePasskeys(): {
  passkeys: any
  status: any
  refresh: any
  creating: Ref<boolean>
  deleting: Ref<string | null>
  createPasskey: (userName: string, displayName: string) => Promise<boolean>
  deletePasskey: (id: string) => Promise<boolean>
  authenticateWithPasskey: (email: string) => Promise<boolean>
} {
  const toast = useToast()
  const creating = ref(false)
  const deleting = ref<string | null>(null)

  const { register, authenticate } = useWebAuthn({
    registerEndpoint: '/api/auth/webauthn/link-passkey',
    authenticateEndpoint: '/api/auth/webauthn/authenticate',
  })

  const {
    data: passkeys,
    status,
    refresh,
  } = useFetch('/api/auth/webauthn/linked-passkeys', {
    server: false,
    lazy: true,
  })

  const createPasskey = async (
    userName: string,
    displayName: string,
  ): Promise<boolean> => {
    try {
      creating.value = true
      await register({ userName, displayName })
      await refresh()
      toast.add({
        title: 'Passkey added successfully',
        color: 'success',
      })
      return true
    }
    catch (error) {
      toast.add({
        title: 'Failed to add passkey',
        description: error instanceof FetchError ? error.data?.message : null,
        color: 'error',
      })
      return false
    }
    finally {
      creating.value = false
    }
  }

  const deletePasskey = async (id: string): Promise<boolean> => {
    try {
      deleting.value = id
      await $fetch('/api/auth/webauthn/delete-passkey', {
        method: 'DELETE',
        body: { id },
      })
      await refresh()
      toast.add({
        title: 'Passkey deleted successfully',
        color: 'success',
      })
      return true
    }
    catch (error) {
      toast.add({
        title: 'Failed to delete passkey',
        description: error instanceof FetchError ? error.data?.message : null,
        color: 'error',
      })
      return false
    }
    finally {
      deleting.value = null
    }
  }

  const authenticateWithPasskey = async (email: string): Promise<boolean> => {
    try {
      await authenticate(email)
      return true
    }
    catch (error) {
      toast.add({
        title: 'Failed to authenticate with passkey',
        description: error instanceof FetchError ? error.data?.message : null,
        color: 'error',
      })
      return false
    }
  }

  return {
    passkeys,
    status,
    creating,
    deleting,
    createPasskey,
    deletePasskey,
    authenticateWithPasskey,
  }
}

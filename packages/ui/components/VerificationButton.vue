<script setup lang="ts">
const props = defineProps<{
  id: number | string
  domain: string
  isVerifiedProp: number | boolean
}>()

const { isVerifiedProp } = toRefs(props)
const isVerified = ref(isVerifiedProp.value)
watch(isVerifiedProp, v => (isVerified.value = v))

const { loggedIn, user } = useUserSession()
const toast = useToast()

const modalOpen = ref(false)
const accountLoading = ref(false)
const emailLoading = ref(false)
const customEmail = ref('')

async function claimWithAccount() {
  if (!loggedIn.value) {
    toast.add({
      id: 'entity-verification-login',
      title: 'Login required',
      description: 'You need to login to claim this entity.',
      icon: 'exclamation-circle',
    })
    return
  }
  if (!user.value?.email) {
    toast.add({
      id: 'claim-entity-error',
      title: 'Error',
      description: 'No email found on your account.',
      icon: 'i-heroicons-exclamation-circle',
    })
    return
  }

  accountLoading.value = true
  try {
    const res = await $fetch(`/api/entity/claim/${props.id}`, {
      method: 'POST',
    })
    if (res.message === 'success') {
      toast.add({
        id: 'claim-entity-success',
        title: 'Success',
        description: 'Entity claimed successfully.',
        icon: 'check-circle',
      })
      isVerified.value = user?.id
      modalOpen.value = false
    }
    else {
      toast.add({
        id: 'claim-entity-error',
        title: 'Error',
        description: `Failed to claim the entity. - ${res.message}`,
        icon: 'i-heroicons-exclamation-circle',
      })
    }
  }
  catch (error) {
    toast.add({
      id: 'claim-entity-error',
      title: 'Error',
      description: 'An error occurred while claiming the entity.',
      icon: 'i-heroicons-exclamation-circle',
    })
  }
  finally {
    accountLoading.value = false
  }
}

async function sendVerificationEmail() {
  if (!customEmail.value) {
    toast.add({
      id: 'entity-verification-email-error',
      title: 'Error',
      description: 'Please enter an email address.',
      icon: 'i-heroicons-exclamation-circle',
    })
    return
  }

  emailLoading.value = true
  try {
    const res = await $fetch('/api/entity/verify/email/initiate', {
      method: 'POST',
      body: { id: Number(props.id), email: customEmail.value },
    })
    if (res.ok) {
      toast.add({
        id: 'entity-verification-email-sent',
        title: 'Success',
        description: 'Verification email sent!',
        icon: 'check-circle',
      })
      modalOpen.value = false
    }
    else {
      toast.add({
        id: 'entity-verification-email-error',
        title: 'Error',
        description: `Failed to send email. - ${res.error}`,
        icon: 'i-heroicons-exclamation-circle',
      })
    }
  }
  catch (error) {
    toast.add({
      id: 'entity-verification-email-error',
      title: 'Error',
      description: 'An error occurred while sending verification email.',
      icon: 'i-heroicons-exclamation-circle',
    })
  }
  finally {
    emailLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center">
    <div v-if="isVerified" class="flex items-center text-green-500">
      <UIcon name="i-heroicons-check-circle" class="h-5 w-5" />
      <span class="ml-2">Verified</span>
    </div>
    <div v-else>
      <UModal
        v-model:open="modalOpen"
        title="Verify This Entity"
        description="Choose a verification method below."
      >
        <UButton color="primary" @click="modalOpen = true">
          Claim This Entity
        </UButton>

        <template #body>
          <div class="space-y-6">
            <div>
              <p class="mb-2 font-medium">
                Use your account email: (must be @{{ domain }})
              </p>
              <UButton
                :loading="accountLoading"
                color="success"
                @click="claimWithAccount"
              >
                Use {{ user?.email }}
              </UButton>
            </div>

            <hr>

            <div>
              <p class="mb-2 font-medium">
                Or enter a different email: (must be @{{ domain }})
              </p>
              <UInput
                v-model="customEmail"
                placeholder="name@yourentity.com"
                class="mb-2"
              />
              <UButton
                :loading="emailLoading"
                color="secondary"
                @click="sendVerificationEmail"
              >
                Send Verification Email
              </UButton>
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </div>
</template>

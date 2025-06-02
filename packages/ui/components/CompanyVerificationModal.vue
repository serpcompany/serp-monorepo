<script setup lang="ts">
  interface Props {
    id: number | string;
    domain: string;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['close']);

  const { loggedIn, user } = useUserSession();
  const toast = useToast();

  const accountLoading = ref(false);
  const emailLoading = ref(false);
  const customEmail = ref('');

  async function claimWithAccount() {
    if (!loggedIn.value) {
      toast.add({
        id: 'company-verification-login',
        title: 'Login required',
        description: 'You need to login to claim this company.',
        icon: 'lucide:info',
      });
      return;
    }
    if (!user.value?.email) {
      toast.add({
        id: 'claim-company-error',
        title: 'Error',
        description: 'No email found on your account.',
        icon: 'lucide:info',
      });
      return;
    }

    accountLoading.value = true;

    try {
      const res = await $fetch(`/api/entity/claim/${props.id}`, {
        method: 'POST',
      });
      if (res.message === 'success') {
        toast.add({
          id: 'claim-company-success',
          title: 'Success',
          description: 'Company claimed successfully.',
          icon: 'lucide:circle-check',
        });
        emit('close');
      } else {
        toast.add({
          id: 'claim-company-error',
          title: 'Error',
          description: `Failed to claim the company. - ${res.message}`,
          icon: 'lucide:info',
        });
      }
    } catch (error) {
      toast.add({
        id: 'claim-company-error',
        title: 'Error',
        description: 'An error occurred while claiming the company.',
        icon: 'lucide:info',
      });
    } finally {
      accountLoading.value = false;
    }
  }

  async function sendVerificationEmail() {
    if (!customEmail.value) {
      toast.add({
        id: 'company-verification-email-error',
        title: 'Error',
        description: 'Please enter an email address.',
        icon: 'lucide:info',
      });
      return;
    }

    emailLoading.value = true;
    try {
      const res = await $fetch('/api/entity/verify/email/initiate', {
        method: 'POST',
        body: { id: Number(props.id), email: customEmail.value },
      });
      if (res.ok) {
        toast.add({
          id: 'company-verification-email-sent',
          title: 'Success',
          description: 'Verification email sent!',
          icon: 'lucide:circle-check',
        });
        emit('close');
      } else {
        toast.add({
          id: 'company-verification-email-error',
          title: 'Error',
          description: `Failed to send email. - ${res.error}`,
          icon: 'lucide:info',
        });
      }
    } catch (error) {
      toast.add({
        id: 'company-verification-email-error',
        title: 'Error',
        description: 'An error occurred while sending verification email.',
        icon: 'lucide:info',
      });
    } finally {
      emailLoading.value = false;
    }
  }
</script>

<template>
  <UModal
    title="Verify This Company"
    description="Choose a verification method below."
    :close="{ onClick: () => emit('close') }"
    :ui="{
      title: 'text-base',
    }"
  >
    <template #body>
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col items-start gap-y-3">
          <p class="text-sm font-medium">
            Use your account email
            <span class="text-muted">(must be @{{ domain }})</span>
            :
          </p>
          <UButtonGroup class="w-full">
            <UBadge
              color="neutral"
              variant="outline"
              size="lg"
              class="flex-1"
              :label="user?.email"
            />
            <UButton
              :loading="accountLoading"
              color="success"
              label="Use this email"
              @click="claimWithAccount"
            />
          </UButtonGroup>
        </div>
        <USeparator label="or" orientation="horizontal" />
        <div class="flex flex-col items-start gap-y-3">
          <p class="text-sm font-medium">
            Use an different email
            <span class="text-muted">(must be @{{ domain }})</span>
            :
          </p>
          <UButtonGroup class="w-full">
            <UInput
              v-model="customEmail"
              placeholder="name@yourcompany.com"
              class="w-full"
            />
            <UButton
              :loading="emailLoading"
              color="secondary"
              label="Send verification"
              @click="sendVerificationEmail"
            />
          </UButtonGroup>
        </div>
      </div>
    </template>
  </UModal>
</template>

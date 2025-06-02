<script setup lang="ts">
const toast = useToast()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const hasText = (v: string) => v.trim() !== ''
const isValidEmail = (e: string) => /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(e)

const isComplete = computed(
  () =>
    hasText(form.value.name)
    && isValidEmail(form.value.email)
    && hasText(form.value.message)
    && hasText(form.value.subject),
)

async function submitContact() {
  try {
    loading.value = true
    if (!isComplete.value) {
      throw new Error(
        'Fill in your name, a valid email, a subject, and a message',
      )
    }

    const { error } = await useFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: { 'Content-Type': 'application/json' },
    })

    if (error.value) {
      throw new Error(error.value.message || 'Request failed')
    }

    toast.add({
      id: 'contact-sent',
      title: 'Message Sent!',
      description: 'Thanks for reaching out — we’ll be in touch soon.',
      icon: 'check-circle',
    })

    form.value = { name: '', email: '', subject: '', message: '' }
  }
  catch (err: unknown) {
    toast.add({
      id: 'contact-error',
      title: 'Oops!',
      description:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      icon: 'exclamation-circle',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UPage class="flex min-h-screen items-center justify-center">
    <UMain class="py-20">
      <UCard class="mx-auto max-w-lg p-8">
        <UHeading level="2" class="mb-6 text-center text-2xl font-semibold">
          Contact Us
        </UHeading>
        <form class="space-y-5" @submit.prevent="submitContact">
          <UFormField label="Your Name" required>
            <UInput v-model="form.name" placeholder="Jane Doe" class="w-full" />
          </UFormField>

          <UFormField label="Email" required>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Subject">
            <UInput
              v-model="form.subject"
              placeholder="What’s on your mind?"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Message" required>
            <UTextarea
              v-model="form.message"
              rows="6"
              placeholder="Type your message here..."
              class="w-full"
            />
          </UFormField>

          <div class="text-center">
            <UButton
              type="submit"
              color="primary"
              size="xl"
              :loading="loading"
              :disabled="!isComplete"
            >
              Send Message
            </UButton>
          </div>
        </form>
      </UCard>
    </UMain>
  </UPage>
</template>

<style scoped>
  .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

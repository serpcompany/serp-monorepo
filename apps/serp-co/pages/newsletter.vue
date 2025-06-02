<script setup lang="ts">
const newsletterLoading = ref(false)
const newsletterEmail = ref('')
const toast = useToast()
async function subscribeToNewsletter() {
  try {
    if (!newsletterEmail.value) {
      toast.add({
        id: 'newsletter-error',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        icon: 'exclamation-circle',
      })
      return
    }
    newsletterLoading.value = true
    const { data: res } = await useFetch('/api/mcp/newsletter/subscribe', {
      method: 'POST',
      body: {
        email: newsletterEmail.value,
      },
    })
    if (res.value.status === 200) {
      toast.add({
        id: 'newsletter-success',
        title: 'Subscribed to Newsletter',
        description: 'You have successfully subscribed to the newsletter.',
        icon: 'check-circle',
      })
    }
    else {
      toast.add({
        id: 'newsletter-error',
        title: 'Error Subscribing to Newsletter',
        description: res.value.message,
        icon: 'exclamation-circle',
      })
    }
  }
  catch (error) {
    toast.add({
      id: 'newsletter-error',
      title: 'Error Subscribing to Newsletter',
      description: (error as Error).message,
      icon: 'exclamation-circle',
    })
  }
  finally {
    newsletterLoading.value = false
  }
}
</script>

<template>
  <UMain>
    <UPageHero
      title="Newsletter"
      description="Stay updated with the latest news and updates from our team."
    >
      <UContainer>
        <form class="mx-auto max-w-5xl" @submit.prevent="subscribeToNewsletter">
          <div
            class="flex flex-col items-center justify-between gap-4 sm:flex-row"
          >
            <div class="flex w-full max-w-sm">
              <UInput
                v-model="newsletterEmail"
                type="email"
                placeholder="Enter your email"
                :loading="newsletterLoading"
                class="w-full"
              />
              <UButton type="submit" :loading="newsletterLoading" class="ml-2">
                Submit
              </UButton>
            </div>
          </div>
        </form>
      </UContainer>
    </UPageHero>
  </UMain>
</template>

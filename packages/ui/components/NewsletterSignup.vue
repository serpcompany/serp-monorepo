<script setup lang="ts">
  defineProps({
    // Color options for the signup button
    buttonBackground: {
      type: String,
      default: 'transparent',
    },
    buttonBackgroundDark: {
      type: String,
      default: 'transparent',
    },
    buttonBackgroundHover: {
      type: String,
      default: 'neutral-800',
    },
    buttonBackgroundHoverDark: {
      type: String,
      default: 'neutral-800',
    },
    buttonTextColor: {
      type: String,
      default: 'white',
    },
    buttonTextColorDark: {
      type: String,
      default: 'white',
    },
    buttonBorderColor: {
      type: String,
      default: 'neutral-700',
    },
    buttonBorderColorDark: {
      type: String,
      default: 'neutral-700',
    },
  });

  const newsletterLoading = ref(false);
  const newsletterEmail = ref('');
  const toast = useToast();
  const showNewsletterModal = ref(false);

  async function subscribeToNewsletter() {
    try {
      if (!newsletterEmail.value) {
        toast.add({
          id: 'newsletter-error',
          title: 'Invalid Email',
          description: 'Please enter a valid email address.',
          icon: 'exclamation-circle',
        });
        return;
      }
      newsletterLoading.value = true;
      const { data: res } = await useFetch('/api/subscribe', {
        method: 'POST',
        body: {
          email: newsletterEmail.value,
        },
      });
      toast.add({
        id: 'newsletter-success',
        title: 'Subscribed to Newsletter',
        description: 'You have successfully subscribed to the newsletter.',
        icon: 'check-circle',
      });
    } catch (error) {
      toast.add({
        id: 'newsletter-error',
        title: 'Error Subscribing to Newsletter',
        description: (error as Error).message,
        icon: 'exclamation-circle',
      });
    } finally {
      newsletterLoading.value = false;
    }
  }
</script>

<template>
  <UButton
    size="xl"
    label="Subscribe"
    color="primary"
    :class="`my-4 inline-flex items-center gap-2 rounded-md border border-${buttonBorderColor} bg-${buttonBackground} hover:bg-opacity-90 px-8 py-3 text-lg font-semibold transition-colors hover:bg-${buttonBackgroundHover} focus:outline-hidden focus-visible:ring-2 focus-visible:ring-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:cursor-not-allowed aria-disabled:opacity-75 dark:bg-${buttonBackgroundDark} dark:text-${buttonTextColorDark} dark:border-${buttonBorderColorDark} dark:hover:bg-${buttonBackgroundHoverDark} text-${buttonTextColor}`"
    @click="showNewsletterModal = true"
  />
  <UModal v-model:open="showNewsletterModal" title="Newsletter">
    <template #header>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-neutral-300">
        Subscribe to the newsletter
      </h2>
    </template>
    <template #body>
      <form class="mx-auto max-w-5xl" @submit.prevent="subscribeToNewsletter">
        <div class="flex flex-col items-center justify-center gap-4">
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
    </template>
  </UModal>
</template>

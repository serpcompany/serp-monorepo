<script setup lang="ts">
  const badges = [
    {
      name: 'SERP Featured',
      url: 'https://embeds.serp.co/serp-featured-trophy.svg',
      path: 'serp-featured-trophy',
      width: 250,
      height: 50,
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-med.svg',
      path: 'serp-verified-med',
      width: 250,
      height: 50,
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-small.svg',
      path: 'serp-verified-small',
      width: 250,
      height: 50,
    },
    {
      name: 'SERP Verified',
      url: 'https://embeds.serp.co/serp-verified-tiny.svg',
      path: 'serp-verified-tiny',
      width: 250,
      height: 50,
    },
    {
      name: 'SERP Featured',
      url: 'https://embeds.serp.co/serp-featured-small.svg',
      path: 'serp-featured-small',
      width: 250,
      height: 50,
    },
  ]

  const toast = useToast()

  function copyToClipboard(badge) {
    // Generate UTM parameters using badge information
    const utmSource = 'serp-embeds' // The general source/platform
    const utmMedium = `badge` // The medium type
    const utmCampaign = `badge-${badge.path}` // Specific campaign identifier

    // Create URL with UTM parameters
    const badgeUrl = `https://serp.co/?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`

    // Use explicit width and height HTML attributes for consistent rendering across third-party sites
    const embedCode = `<a href="${badgeUrl}"><img src="https://embeds.serp.co/${badge.path}.svg" alt="${badge.name}" width="250" height="50" /></a>`

    navigator.clipboard
      .writeText(embedCode)
      .then(() => {
        toast.add({
          title: 'Copied to clipboard!',
          description: 'Paste the code on your clipboard onto your website.',
          icon: 'i-lucide-check-circle',
          color: 'success',
        })
      })
      .catch(() => {
        toast.add({
          title: 'Failed to copy',
          description: 'Please try again or copy manually.',
          icon: 'i-lucide-alert-circle',
          color: 'danger',
        })
      })
  }

  definePageMeta({
    title: 'SERP Badges',
    description:
      'Official SERP badges for embedding on your website to showcase recognition and verification.',
  })
</script>

<template>
  <div>
    <UContainer class="py-16">
      <div class="mb-12 text-center">
        <h1 class="mb-4 text-4xl font-bold">
          SERP Badges
        </h1>
        <p class="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400">
          Showcase your recognition with embeddable badges for your website.
          Click the button below each badge to copy its HTML code to your
          clipboard.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="(badge, index) in badges" :key="index">
          <UCard class="flex h-full flex-col">
            <div
              class="flex flex-1 items-center justify-center rounded-t-lg p-4"
              style="min-height: 120px; overflow: visible"
            >
              <img
                :src="badge.url"
                :alt="badge.name"
                width="250"
                height="50"
              />
            </div>
            <UDivider />
            <div class="flex items-center justify-center p-4">
              <UButton
                block
                color="neutral"
                variant="outline"
                icon="i-lucide-clipboard-copy"
                size="xl"
                @click="copyToClipboard(badge)"
              />
            </div>
          </UCard>
        </div>
      </div>

      <UDivider class="my-16" />
    </UContainer>
  </div>
</template>

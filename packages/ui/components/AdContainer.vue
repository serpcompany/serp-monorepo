<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      adSlot: string
      format?: string
      className?: string
      containerId?: string
      adClient?: string
    }>(),
    {
      format: 'auto',
      className: '',
      containerId: '',
      adClient: undefined,
    },
  )

  // Get app config
  const appConfig = useAppConfig()

  // Default AdSense publisher ID - can be overridden using app.config.ts
  const defaultAdClient = 'ca-pub-2343633734899216'

  // Use provided adClient, or app config value, or default
  const adClient = computed(() => {
    return props.adClient || appConfig.adsense?.publisherId || defaultAdClient
  })
</script>

<template>
  <div
    :id="containerId || `ad-container-${adSlot}`"
    class="ad-container"
    :class="[className]"
    :data-ad-unit="adSlot"
  >
    <ClientOnly>
      <!-- This div provides explicit signals to the AdSense crawler -->
      <div
        class="adsbygoogle"
        style="display: block"
        :data-ad-client="adClient"
        :data-ad-slot="adSlot"
        :data-ad-format="format"
        data-full-width-responsive="true"
      ></div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.ad-container {
  min-height: 250px;
  width: 100%;
  margin: 1.5rem 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

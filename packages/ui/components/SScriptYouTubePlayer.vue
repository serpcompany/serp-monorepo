<script setup lang="ts">
  import type { HTMLAttributes, ImgHTMLAttributes, Ref } from 'vue'
  import {
    useHead,
    useScriptTriggerElement,
    useScriptYouTubePlayer,
  } from '#imports'
  import { defu } from 'defu'
  /// <reference types="youtube" />
  import { computed, onMounted, ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      placeholderAttrs?: ImgHTMLAttributes
      rootAttrs?: HTMLAttributes
      aboveTheFold?: boolean
      videoId: string
      playerVars?: YT.PlayerVars
      width?: number
      height?: number
    }>(),
    {
      // Use the manual trigger for explicit load control
      trigger: 'manual',
      playerVars: { autoplay: 0, playsinline: 1 },
      width: 640,
      height: 360,
      placeholderAttrs: () => ({}),
      rootAttrs: () => ({}),
    },
  )

  const emits = defineEmits<{
    'ready': [e: YT.PlayerEvent]
    'state-change': [e: YT.OnStateChangeEvent, target: YT.Player]
    'error': [e: YT.OnErrorEvent, target: YT.Player]
  }>()

  const events: (keyof YT.Events)[] = ['onReady', 'onStateChange', 'onError']

  const rootEl = ref<HTMLElement>()
  const youtubeEl = ref<HTMLElement>()
  const ready = ref(false)

  // Create a manual trigger promise
  const trigger = useScriptTriggerElement({
    trigger: 'manual',
    el: rootEl,
  })

  // Load & status handlers from composable
  const { onLoaded, status, load } = useScriptYouTubePlayer({
    scriptOptions: { trigger },
  })

  const player: Ref<YT.Player | undefined> = ref()

  onMounted(async () => {
    // Immediately inject the YouTube IFrame API script
    load()

    // Once loaded, hydrate the player
    onLoaded(async (instance) => {
      const YouTube =
        instance.YT instanceof Promise ? await instance.YT : instance.YT
      await new Promise<void>((resolve) => {
        if (typeof YT.Player === 'undefined')
          YouTube.ready(resolve)
        else resolve()
      })
      player.value = new YT.Player(youtubeEl.value!, {
        videoId: props.videoId,
        playerVars: props.playerVars,
        width: props.width,
        height: props.height,
        events: Object.fromEntries(
          events.map(event => [
            event,
            (e: unknown) => {
              const emitEventName = event
                .replace(/([A-Z])/g, '-$1')
                .replace('on-', '')
                .toLowerCase()

              // Map the event names to the correct emit types
              if (event === 'onReady') {
                emits('ready', e as YT.PlayerEvent)
                ready.value = true
              }
              else if (event === 'onStateChange') {
                emits('state-change', e as YT.OnStateChangeEvent, player.value!)
              }
              else if (event === 'onError') {
                emits('error', e as YT.OnErrorEvent, player.value!)
              }
            },
          ]),
        ),
      })
    })
  })

  defineExpose({ player })

  const rootAttrs = computed(() =>
    defu(props.rootAttrs, {
      'aria-busy': status.value === 'loading',
      'aria-label':
        status.value === 'awaitingLoad'
          ? 'YouTube Player - Placeholder'
          : status.value === 'loading'
            ? 'YouTube Player - Loading'
            : 'YouTube Player - Loaded',
      'role': 'application',
      'style': {
        position: 'relative',
        backgroundColor: 'black',
        maxWidth: '100%',
        width: `${props.width}px`,
        aspectRatio: `${props.width}/${props.height}`,
      },
      ...(trigger instanceof Promise ? trigger.ssrAttrs || {} : {}),
    } as HTMLAttributes),
  )

  const placeholder = computed(
    () => `https://i.ytimg.com/vi_webp/${props.videoId}/sddefault.webp`,
  )

  if (import.meta.server) {
    useHead({
      link: [
        {
          rel: props.aboveTheFold ? 'preconnect' : 'dns-prefetch',
          href: 'https://i.ytimg.com',
        },
        props.aboveTheFold
          ? { rel: 'preload', as: 'image', href: placeholder.value }
          : {},
      ],
    })
  }

  const placeholderAttrs = computed(() =>
    defu(props.placeholderAttrs, {
      src: placeholder.value,
      alt: '',
      loading: props.aboveTheFold ? 'eager' : 'lazy',
      style: { width: '100%', objectFit: 'cover', height: '100%' },
    } as ImgHTMLAttributes),
  )
</script>

<template>
  <ClientOnly fallback-tag="div">
    <template #fallback>
      <img v-bind="placeholderAttrs" alt="Video Placeholder" />
    </template>
    <div ref="rootEl" v-bind="rootAttrs">
      <div
        ref="youtubeEl"
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0"
      ></div>
      <slot v-if="!ready" name="placeholder" :placeholder="placeholder">
        <img v-bind="placeholderAttrs" />
      </slot>
      <slot v-if="status === 'loading'" name="loading">
        <ScriptLoadingIndicator />
      </slot>
      <slot v-else-if="status === 'error'" name="error"></slot>
      <slot></slot>
    </div>
  </ClientOnly>
</template>

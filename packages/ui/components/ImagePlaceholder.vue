<template>
  <UPageCard variant="subtle">
    <div
      class="relative flex aspect-video items-center justify-center overflow-hidden rounded-(--ui-radius) border border-dashed border-(--ui-border-accented) px-4 opacity-75"
    >
      <svg
        class="absolute inset-0 h-full w-full stroke-(--ui-border-inverted)/10"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
          </pattern>
        </defs>
        <rect
          stroke="none"
          fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
          width="100%"
          height="100%"
        />
      </svg>

      <slot></slot>
    </div>
  </UPageCard>
</template>

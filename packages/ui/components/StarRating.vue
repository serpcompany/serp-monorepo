<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue';

  // Props and emits - properly typed with TypeScript
  const props = defineProps({
    modelValue: {
      type: Number,
      default: null,
    },
    maxRating: {
      type: Number,
      default: 5,
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg', 'xl'].includes(value),
    },
    color: {
      type: String,
      default: 'yellow',
      validator: (value: string) =>
        ['yellow', 'gold', 'orange', 'primary'].includes(value),
    },
    ratingLabels: {
      type: Array,
      default: () => ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
    },
    showLabels: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(['update:modelValue']);

  // Reactive state
  const hoverRating = ref<number | null>(null);
  const animatedRating = ref<number | null>(null); // Initialize with null to avoid reactivity issues

  // Set initial value after component mount using the onMounted hook
  onMounted(() => {
    animatedRating.value = props.modelValue;
  });

  // Computed styles based on size
  const starSizeClass = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-6 h-6';
      case 'lg':
        return 'w-8 h-8';
      case 'xl':
        return 'w-10 h-10';
      default:
        return 'w-6 h-6';
    }
  });

  // Computed styles based on color
  const starFillColor = computed(() => {
    switch (props.color) {
      case 'yellow':
        return 'text-yellow-400 dark:text-yellow-500';
      case 'gold':
        return 'text-amber-500 dark:text-amber-400';
      case 'orange':
        return 'text-orange-500 dark:text-orange-400';
      case 'primary':
        return 'text-primary-500 dark:text-primary-400';
      default:
        return 'text-yellow-400 dark:text-yellow-500';
    }
  });

  // Computed display rating (either hovered or selected)
  const displayRating = computed(() => {
    return hoverRating.value !== null ? hoverRating.value : props.modelValue;
  });

  // Current label based on rating
  const currentLabel = computed(() => {
    if (!displayRating.value) return '';
    const index = Math.min(
      Math.ceil(displayRating.value) - 1,
      props.ratingLabels.length - 1,
    );
    return props.ratingLabels[index];
  });

  // Determine if a star should be filled
  function shouldFillStar(starIndex: number) {
    const rating = displayRating.value;
    if (!rating) return false;
    return starIndex <= rating;
  }

  // Determine if a star should be half-filled
  function shouldHalfFillStar(starIndex: number) {
    const rating = displayRating.value;
    if (!rating) return false;

    const roundedRating = Math.floor(rating);
    return roundedRating < rating && starIndex === Math.ceil(rating);
  }

  // Handle user interactions
  function setHoverRating(rating: number) {
    if (props.readonly) return;
    hoverRating.value = rating;
  }

  function clearHoverRating() {
    if (props.readonly) return;
    hoverRating.value = null;
  }

  function setRating(rating: number) {
    if (props.readonly) return;
    emit('update:modelValue', rating);
  }

  // Animation when rating changes
  watch(
    () => props.modelValue,
    (newValue) => {
      if (newValue !== null) {
        // Animate the stars filling
        const duration = 400; // ms
        const steps = 10;
        const stepValue = newValue / steps;
        const stepDuration = duration / steps;

        animatedRating.value = 0;

        const animate = (step: number) => {
          if (step <= steps) {
            animatedRating.value = stepValue * step;
            setTimeout(() => animate(step + 1), stepDuration);
          } else {
            animatedRating.value = newValue;
          }
        };

        animate(1);
      } else {
        animatedRating.value = null;
      }
    },
  );
</script>

<template>
  <div>
    <div class="flex items-center gap-1" @mouseleave="clearHoverRating">
      <div
        v-for="i in props.maxRating"
        :key="i"
        class="relative cursor-pointer transition-transform duration-150 hover:scale-110"
        :class="{ 'cursor-default': props.readonly }"
        @mouseenter="setHoverRating(i)"
        @click="setRating(i)"
      >
        <!-- Empty star (background) -->
        <UIcon
          name="i-heroicons-star"
          class="text-gray-300 dark:text-gray-600"
          :class="starSizeClass"
        />

        <!-- Filled star (overlay) -->
        <UIcon
          v-if="shouldFillStar(i)"
          name="i-heroicons-star-solid"
          class="absolute inset-0 transition-opacity duration-200"
          :class="[starSizeClass, starFillColor]"
        />
      </div>

      <!-- Rating label -->
      <span
        v-if="showLabels && currentLabel"
        class="ml-2 text-sm font-medium text-gray-700 transition-opacity duration-200 dark:text-gray-300"
        :class="{ 'opacity-0': !displayRating }"
      >
        {{ currentLabel }}
      </span>
    </div>
  </div>
</template>

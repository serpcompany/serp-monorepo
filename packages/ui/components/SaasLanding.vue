<script setup lang="ts">
  import type { PropType } from 'vue';

  const props = defineProps({
    page: {
      type: Object as PropType<unknown>,
      required: true,
    },
  });
</script>

<template>
  <div>
    <UPageHero
      :title="props.page.hero.title"
      :description="props.page.hero.description"
      :links="props.page.hero.links"
    >
      <template #top>
        <div
          class="absolute left-1/2 size-60 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[300px] sm:size-80 dark:bg-(--ui-primary)"
        />
        <LazyStarsBg />
      </template>

      <PromotionalVideo />
    </UPageHero>

    <UPageSection
      v-for="(section, index) in props.page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :orientation="section.orientation"
      :reverse="section.reverse"
      :features="section.features"
    >
      <ImagePlaceholder />
    </UPageSection>

    <UPageSection
      v-if="props.page.features"
      :title="props.page.features.title"
      :description="props.page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in props.page.features.items"
          :key="index"
          v-bind="item"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection
      v-if="props.page.testimonials"
      id="testimonials"
      :headline="props.page.testimonials.headline"
      :title="props.page.testimonials.title"
      :description="props.page.testimonials.description"
    >
      <UPageColumns class="xl:columns-4">
        <UPageCard
          v-for="(testimonial, index) in props.page.testimonials.items"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
            description:
              'before:content-[open-quote] after:content-[close-quote]',
          }"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="lg" />
          </template>
        </UPageCard>
      </UPageColumns>
    </UPageSection>

    <USeparator />

    <UPageCTA
      v-if="props.page.cta"
      v-bind="props.page.cta"
      variant="naked"
      class="overflow-hidden"
    >
      <div
        class="absolute left-1/2 size-40 -translate-x-1/2 -translate-y-80 transform rounded-full blur-[250px] sm:size-50 dark:bg-(--ui-primary)"
      />
      <LazyStarsBg />
    </UPageCTA>
  </div>
</template>

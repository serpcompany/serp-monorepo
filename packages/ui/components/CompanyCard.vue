<script setup lang="ts">
  import type { Company } from '@serp/types/types';

  interface Props {
    company: Company;
    showReadMore?: boolean;
    showFeatures?: boolean;
    showExpandedContent?: boolean;
    baseSlug?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    baseSlug: 'products/'
  });

  const featured = computed(() => props.company.featured);
  const companyHyperlink = computed(
    () => `/${props.baseSlug}${props.company.slug}/reviews/`
  );

  const mainImage = computed(() => {
    if (props.company.logo) {
      return props.company.logo;
    } else if (props.company.screenshots && props.company.screenshots.length) {
      return props.company.screenshots[0];
    }

    return null;
  });
</script>

<template>
  <UCard
    :ui="{
      root: 'flex flex-col divide-dashed transition-all',
      body: 'p-5 sm:p-5 flex-grow',
      footer: `px-5 py-4 sm:px-5 bg-gray-50 dark:bg-black/10 rounded-b-lg`
    }"
    :class="[
      featured
        ? 'ring-secondary-400 hover:ring-secondary-300 dark:ring-secondary-600 dark:hover:ring-secondary-500 ring-2 lg:col-span-2'
        : 'hover:ring-(--ui-border-accented)'
    ]"
    variant="outline"
  >
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <div class="bg-muted size-auto rounded-sm border border-(--ui-border)">
          <UAvatar
            :ui="{ root: 'rounded-sm' }"
            :src="mainImage"
            icon="lucide:asterisk"
            size="3xl"
          />
        </div>
        <div class="flex flex-1 items-center gap-x-2">
          <h2 class="text-dark text-xl font-semibold">
            <NuxtLink
              :to="companyHyperlink"
              class="transition-all hover:underline"
            >
              {{ company.name }}
            </NuxtLink>
          </h2>
          <UButton
            :to="company.serplyLink"
            variant="outline"
            color="neutral"
            size="sm"
            trailing-icon="lucide:external-link"
            target="_blank"
            label="Website"
            class="ml-auto"
            external
          />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <p class="text-muted text-sm">{{ company.excerpt }}</p>
        <div
          v-if="Boolean(company.categories?.length)"
          class="inline-flex flex-wrap items-center gap-2"
        >
          <template
            v-for="category in company.categories.slice(0, 4)"
            :key="category.slug"
          >
            <UBadge
              size="sm"
              variant="soft"
              color="secondary"
              :label="category.name"
            />
          </template>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row items-center gap-3">
        <VoteButton
          :id="company.id"
          :users-current-vote="company.usersCurrentVote"
          :upvotes="company.numUpvotes"
          :downvotes="company.numDownvotes"
          size="sm"
          module="company"
        />
        <UButton
          :to="company.serplyLink"
          class="ml-auto"
          color="neutral"
          external
          icon="lucide:bookmark"
          size="sm"
          target="_blank"
          variant="outline"
        />
      </div>
    </template>
  </UCard>
</template>

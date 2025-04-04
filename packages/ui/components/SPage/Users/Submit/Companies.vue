<script setup lang="ts">
  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) {
    navigateTo('/');
  }

  const data = await useCompanySubmissions();

  useSeoMeta({
    title: 'Submissions'
  });
</script>

<template>
  <UPage>
    <!-- hero -->
    <SHero
      headline="Submissions"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <!-- rows: companies -->
      <div class="space-y-4">
        <div
          v-if="data"
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <div
            v-for="submission in data"
            :key="submission.id"
            class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
          >
            <div v-if="submission.isPriority">
              <UBadge>Priority</UBadge>
            </div>
            <NuxtLink
              :to="
                submission.approved
                  ? `/products/${submission.domain}/reviews/`
                  : `/users/submit/company?id=${submission.id}`
              "
            >
              <LazyNuxtImg
                v-if="submission.logo"
                :src="submission.logo"
                alt="Submission Image"
                class="mb-4 h-48 w-full rounded-lg object-cover"
              />
              <h2 class="text-lg font-semibold">
                {{ submission.name }} ({{ submission.domain }})
              </h2>
              <p v-if="submission.description" class="text-neutral-600">
                {{ submission.description }}
              </p>
              <p class="text-neutral-500">
                Status:
                {{
                  submission.approved
                    ? 'Approved'
                    : submission.reviewedAt
                      ? 'Denied'
                      : 'Pending'
                }}
              </p>
              <p v-if="submission.reviewedAt" class="text-neutral-500">
                Reviewed At: {{ submission.reviewedAt }}
              </p>
              <p v-if="submission.reviewedNotes" class="text-neutral-500">
                Review Notes: {{ submission.reviewedNotes }}
              </p>
              <p v-if="submission.reviewedBy" class="text-neutral-500">
                Reviewed By: {{ submission.reviewedBy }}
              </p>
              <p class="text-neutral-500">
                Created At: {{ submission.createdAt }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </UMain>
  </UPage>
</template>

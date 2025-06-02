<script setup lang="ts">
const { loggedIn } = useUserSession()
if (!loggedIn.value) {
  navigateTo('/login')
}

// fetch submissions
const submissions = await useCompanySubmissions()

// fetch verified companies
const {
  data: verifiedData,
  pending: verifiedPending,
  error: verifiedError,
} = await useFetch<{
  companies: Array<{
    id: number
    name: string
    domain: string
    verifiedAt: string
  }>
}>('/api/entities/verified?module=company', {
  method: 'GET',
})

useSeoMeta({
  title: 'My Companies',
})

const toast = useToast()
const loading = ref(false)
async function verifyCompanyBacklink(submissionId: string) {
  try {
    loading.value = true
    const { data: response, error } = await useFetch(
      `/api/entity/submit-verify-backlink?id=${submissionId}`,
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
      },
    )
    if (error.value) {
      toast.add({
        id: 'verify-backlink-error',
        title: 'Error Verifying Backlink',
        description: error.value,
        icon: 'exclamation-circle',
      })
      return
    }
    if (response.value && response.value.verified) {
      const submission = submissions.find(s => s.id === submissionId)
      if (submission) {
        submission.backlinkVerified = true
      }
      toast.add({
        id: 'verify-backlink-success',
        title: 'Backlink Verified',
        description: 'The backlink has been verified successfully.',
        icon: 'check-circle',
      })
    }
    else {
      toast.add({
        id: 'verify-backlink-failure',
        title: 'Backlink Verification Failed',
        description: 'The backlink could not be verified.',
        icon: 'exclamation-circle',
      })
    }
  }
  catch (error) {
    toast.add({
      id: 'verify-backlink-error',
      title: 'Error Verifying Backlink',
      description: error.message,
      icon: 'exclamation-circle',
    })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <UPage>
    <SHero
      headline="Submissions & Verified Companies"
      :show-search-bar="false"
      :show-buttons="false"
    />

    <UMain>
      <div class="space-y-8">
        <!-- Submissions Section -->
        <div v-if="submissions" class="">
          <h2 class="mb-4 text-xl font-semibold">
            Your Submissions
          </h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="submission in submissions"
              :key="submission.id"
              class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
            >
              <div v-if="submission.isPriority">
                <UBadge color="success">
                  Priority
                </UBadge>
              </div>
              <div v-if="submission.backlinkVerified">
                <UBadge color="success">
                  Verified
                </UBadge>
              </div>
              <div v-else>
                <UBadge color="error">
                  Not Verified
                </UBadge>
                <UButton @click.prevent="verifyCompanyBacklink(submission.id)">
                  Check Backlink
                </UButton><span>(must have a <bold>do follow</bold> backlink to current site
                  on the submission domain homepage, if not working, ensure you
                  have `SERPVerificationBot/1.0` user-agent whitelisted)</span>
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
                <h3 class="text-lg font-semibold">
                  {{ submission.name }} ({{ submission.domain }})
                </h3>
                <p v-if="submission.description" class="text-neutral-600">
                  {{ submission.description }}
                </p>
                <p class="mt-2 text-neutral-500">
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

        <!-- Verified Companies Section -->
        <div>
          <h2 class="mb-4 text-xl font-semibold">
            Verified Companies
          </h2>

          <div v-if="verifiedPending" class="py-8 text-center">
            Loading companies…
          </div>

          <div v-else-if="verifiedError" class="py-8 text-center text-red-500">
            Error loading companies: {{ verifiedError.message }}
          </div>

          <div v-else>
            <div
              v-if="verifiedData?.companies?.length"
              class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <NuxtLink
                v-for="company in verifiedData.companies"
                :key="company.id"
                :to="`/users/manage/company/${company.id}`"
                class="rounded-lg bg-white p-4 shadow-md dark:bg-neutral-800"
              >
                <h3 class="text-lg font-semibold">
                  {{ company.name }} ({{ company.domain }})
                </h3>
                <p class="mt-2 text-sm text-neutral-600">
                  Verified on {{ company.verifiedAt }}
                </p>
              </NuxtLink>
            </div>

            <p v-else class="py-8 text-center text-neutral-500">
              You haven’t verified with any companies yet.
            </p>
          </div>
        </div>
      </div>
    </UMain>
  </UPage>
</template>

<style scoped>
  .fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>

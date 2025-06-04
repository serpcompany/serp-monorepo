<script setup lang="ts">
const { loggedIn } = useUserSession()
const route = useRoute()

if (!loggedIn.value) {
  navigateTo(`/login?redirectTo=${route.fullPath}`)
}

const requestId = route.query.requestId as string
const code = route.query.code as string

const {
  data: res,
  pending,
  error,
} = await useFetch('/api/entity/verify/email', {
  method: 'POST',
  body: { requestId: Number(requestId), code },
})

const success = res.value?.ok
</script>

<template>
  <div class="mx-auto max-w-md p-6">
    <h1 class="mb-4 text-2xl font-bold">
      Company Verification
    </h1>

    <div v-if="pending" class="py-8 text-center">
      🔄 Checking your code…
    </div>

    <div v-else-if="error" class="py-8 text-center text-red-500">
      {{ error.message || error }}
    </div>

    <div v-else-if="!success" class="py-8 text-center text-red-500">
      {{ res?.error || 'Verification failed. Please try again.' }}
    </div>

    <div v-else class="py-8 text-center">
      <p class="mb-4 text-lg text-green-600">
        🎉 Your company is now verified!
      </p>
      <NuxtLink to="/users/manage/companies" class="underline">
        Manage your companies
      </NuxtLink>
    </div>
  </div>
</template>

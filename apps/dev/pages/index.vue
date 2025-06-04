<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const page = ref(Number(route.query.page) || 1)
const limit = ref(Number(route.query.limit) || 50)
const categories = await useCompanyCategories()

const heroLinks = ref([
  {
    label: 'Explore',
    to: '/products/',
    icon: 'i-lucide-search',
    class: 'rounded-lg',
  },
  {
    label: 'Solutions',
    to: 'https://solutions.serp.co',
    color: 'neutral' as const,
    variant: 'subtle' as const,
    trailingIcon: 'i-lucide-arrow-right',
    class: 'rounded-lg',
  },
])

const logos = [
  'i-simple-icons-google',
  'i-simple-icons-amazon',
  'i-simple-icons-meta',
  'i-simple-icons-microsoft',
  'i-simple-icons-apple',
  'i-simple-icons-adobe',
  'i-simple-icons-slack',
  'i-simple-icons-shopify',
]

let data = await useCompanies(page.value, limit.value)

watch([page, limit], async ([newPage, newLimit]) => {
  const query = { ...route.query }
  if (newPage !== 1) {
    query.page = String(newPage)
  }
  else {
    delete query.page
  }
  if (newLimit !== 50) {
    query.limit = String(newLimit)
  }
  else {
    delete query.limit
  }
  data = await useCompanies(page.value, limit.value)
  router.push({ query })
})

useSeoMeta({
  title: 'Home',
})
</script>

<template>
  <SPageHome />
</template>

<script setup lang="ts">
  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params;
  const data = await useCompany(`${slug}`);
  if (!data) {
    router.push('/404');
  }
</script>
<template>
  <SPageGenericServiceProvider
    v-if="data?.module === 'service_provider'"
    :data="data"
  />
  <SPageCompanySingle v-else :data="data" />
</template>

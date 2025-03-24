<template>
  <div class="prose dark:prose-invert container my-20">
    <h1>Legal Information</h1>
    <ul>
      <li>
        <NuxtLink to="/legal/affiliate-disclosure/">Affiliate Disclosure</NuxtLink>
        <NuxtLink to="/legal/dmca/">DMCA & IP Complaints</NuxtLink>
        <NuxtLink to="/legal/privacy-policy/">Privacy Policy</NuxtLink>
        <NuxtLink to="/legal/terms-conditions/">Terms & Conditions</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const domain = config.public.domain;

useSeoMeta({
  title: 'Affiliate Disclosure',
  description:
    'Links to various resources on our website about legal related items.'
});
</script>

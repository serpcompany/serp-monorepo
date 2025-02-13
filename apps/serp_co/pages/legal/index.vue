<template>
  <div class="prose dark:prose-invert container my-20">
    <h1>Legal Information</h1>
    <ul>
      <li>
        <nuxt-link to="/legal/affiliate-disclosure/"
          >Affiliate Disclosure</nuxt-link
        >
        <nuxt-link to="/legal/dmca/">DMCA & IP Complaints</nuxt-link>
        <nuxt-link to="/legal/privacy-policy/">Privacy Policy</nuxt-link>
        <nuxt-link to="/legal/terms-conditions/">Terms & Conditions</nuxt-link>
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

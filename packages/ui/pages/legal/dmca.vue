<script setup lang="ts">
  const config = useRuntimeConfig();
  const domain = config.public.domain;

  useSeoMeta({
    title: 'DMCA',
    description: 'Steps to report copyright infringement under our DMCA policy.'
  });
</script>

<template>
  <div class="prose dark:prose-invert container my-20">
    <h1>DMCA & IP Complaints</h1>
    <p>
      We take intellectual property very seriously. If you would like to file a
      complaint regarding the DMCA or other intellectual property matters,
      please email: dmca[@]{{ domain }} and/or ipcomplaints[@]{{ domain }}
      Please make sure you remove the brackets [ ] and spaces in the above
      provided emails. We format it like this to reduce spam from bots, spiders,
      and scrapers. Thank you.
    </p>
  </div>
</template>

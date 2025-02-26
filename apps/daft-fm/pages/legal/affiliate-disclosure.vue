<template>
  <div class="prose dark:prose-invert container my-20">
    <h1>Affiliate Disclosure</h1>
    <p>
      Disclosure of Material Connection: Some of the links in this website are
      affiliate links. This means if you click on the link and purchase the
      item, the owner of this website will receive an affiliate commission.
      Regardless, the owner of this website only recommend products or services
      that will add value to the readers. The owner of this website is
      disclosing this in accordance with the Federal Trade Commission’s 16 CFR,
      Part 255: Guides Concerning the Use of Endorsements and Testimonials in
      Advertising. This website may accept forms of cash advertising,
      sponsorship, paid insertions or other forms of compensation. The
      compensation received may influence the advertising content, topics or
      posts made in this website. That content, advertising space or post may
      not always be identified as paid or sponsored content. The owner(s) of
      this website may be compensated to provide opinions on products, services,
      websites and various other topics. Even though the owner(s) of this
      website receives compensation for our posts or advertisements, we always
      give our honest opinions, findings, beliefs, or experiences on those
      topics or products. The views and opinions expressed on this website are
      purely the author. Any product claim, statistic, quote or other
      representation about a product or service should be verified with the
      manufacturer, provider or party in question. This website does not contain
      any content which might present a conflict of interest. Amazon Associates
      affiliate disclaimer: As an Amazon™ Associate, {{ domain }}
      and/or its related web properties, earn from qualifying purchases.
    </p>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const domain = config.public.domain;

useSeoMeta({
  title: 'Affiliate Disclosure',
  description:
    'Details about our affiliate partnerships and how they impact content on this site.'
});
</script>

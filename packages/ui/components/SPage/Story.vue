<script setup lang="ts">
useHead({
  title: 'Our Story | SERP',
  meta: [
    {
      name: 'description',
      content:
          'Learn about SERP\'s mission to help underdogs win against digital giants and return digital power to its rightful owners.',
    },
  ],
})
</script>

<template>
  <UContainer>
    <UPageBody prose class="compact-prose mx-auto my-20 max-w-2xl">
      <h1>Our Story</h1>
      <p>10 years ago, we started SERP as a simple SEO agency.</p>
      <p>
        Our scope was smaller, but our drive was the same as it is today:
        helping underdogs win against the giants.
      </p>

      <p>
        We've always fought for the little guy and found ways to help them pull
        off the digital version of David v Goliath.
      </p>

      <p>Then the playing field tilted even further.</p>

      <p>
        AI advanced at breakneck speed, creating an unprecedented advantage for
        tech giants with deep pockets.
      </p>
      <p>
        These companies leveraged collective data from billions of users to
        train powerful AI systems, then locked those capabilities behind
        expensive paywalls.
      </p>

      <p>
        The gap between digital haves and have-nots widened into a chasm. The
        same technologies that promised to democratize opportunity instead
        concentrated power in fewer hands.
      </p>

      <p>
        The window to change this trajectory is closing rapidly. We may not get
        another chance.
      </p>

      <p>
        Digital power must return to its rightful owners before it's too late.
      </p>

      <h2>For Brands</h2>
      <p>
        We build growth & automation solutions that help brands succeed online.
        No false promises, no vanity metrics – just systems that deliver real
        results.
      </p>
      <p>
        Our services have generated over $100M for businesses across 200+
        industries. We'd love to help you grow too.
      </p>

      <h2>For Individuals</h2>
      <p>
        We believe AI and digital tools shouldn't be locked behind corporate
        paywalls. This technology was built using everyone's online
        contributions, and now we're being charged for the fruits of that labor.
      </p>
      <p>
        So we've set out to create as many free tools and resources for the
        individual as we can.
      </p>

      <h2>Join the Alliance</h2>
      <p>
        We see ourselves as part of the Alliance standing up to a growing
        Empire. While corporations consolidate power, we're working to put that
        power back in your hands.
      </p>

      <p>But we're a small team and we can't do it alone.</p>

      <p>We need your help.</p>

      <p>
        So, if you see yourself as someone who likes to fight for the
        individual, instead of the large corporations, we want your help.
      </p>

      <p>The digital world shouldn't just work for the privileged few.</p>

      <p>Let's build it differently together, before we lose our shot.</p>

      <p>
        Join the SERP Alliance and help secure the future of the internet for
        the individual.
      </p>

      <!-- Badge section -->
      <div class="mt-12 mb-12 flex items-center justify-center">
        <!-- Iframe version for production -->
        <div
          style="position: relative; width: 200px; height: 133.33333333333334px"
        >
          <iframe
            src="https://serp.ly/@serpai/badges/ai-alliance"
            frameborder="0"
            scrolling="no"
            width="300px"
            height="300px"
            style="position: absolute; z-index: 1"
          />
          <a
            href="https://badges.serp.ai/alliance.html"
            title=""
            target="_blank"
            style="
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 2;
            "
          />
        </div>
      </div>
    </UPageBody>
  </UContainer>
</template>

<style scoped>
  .compact-prose :deep(p) {
  margin-top: 0.5em !important;
  margin-bottom: 0.5em !important;
}

.compact-prose :deep(h2) {
  margin-top: 1.5em !important;
  margin-bottom: 0.5em !important;
}
</style>

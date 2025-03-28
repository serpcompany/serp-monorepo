<template>
  <div>
    <UPageHero
      title="About"
      description="SERP is a digital media company dedicated to helping brands & creators succeed online."
    />

    <UPageSection
      id="features"
      title="Our Mission"
      description="Our mission is help good brands grow online, and support the individuals & creators responsible for building the internet."
      :features="[
        {
          icon: 'i-lucide-rocket',
          title: '$200M+ Revenue Generated',
          description:
            'We\'ve helped hundreds of brands grow online, totalling over 200M+ dollars of new revenues.'
        },
        {
          icon: 'i-lucide-users',
          title: 'Impact',
          description:
            'Our mission is to help one million brands grow. We aren’t there yet, but we\'re getting closer every day.'
        },
        {
          icon: 'i-lucide-line-chart',
          title: 'Diversity',
          description:
            'Proven results for brands & creators across 217+ different industries.'
        }
      ]"
    />

    <UPageSection>
      <UPageCTA
        title="Let's grow together"
        description="Click the button below to get started growing your brand online."
        variant="subtle"
        :links="[
          {
            label: 'Get Started',
            to: 'https://serp.co/get-started',
            target: '_blank',
            icon: 'i-lucide-play',
            color: 'success'
          }
        ]"
      />
    </UPageSection>
  </div>
</template>

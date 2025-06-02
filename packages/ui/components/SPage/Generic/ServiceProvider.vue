<script setup lang="ts">
  import type { Comment, ServiceProvider } from '@serp/types/types';

  const props = defineProps<{
    data: ServiceProvider;
  }>();
  const { user } = useUserSession();
  const route = useRoute();

  const { data } = toRefs(props);

  const isVerified = computed(() => {
    return data.value?.verification === user.value?.id;
  });

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Create a consolidated object with all provider details
  const providerDetails = computed(() => {
    return {
      basic: data.value?.basicInfo || {},
      contracts: data.value?.contracts || {},
      pricing: data.value?.pricing || {},
      services: data.value?.services || {},
      industries: data.value?.industries || {},
      businessesServed: data.value?.businessesServed || {},
      supportSetup: data.value?.supportSetup || {},
      ratings: data.value?.ratings || {},
    };
  });

  // @ts-expect-error: Auto-imported from another layer
  const { comments } = (await useServiceProviderComments(data.value?.id)) as {
    comments: Comment[];
  };

  // @ts-expect-error: Auto-imported from another layer
  const reviews = await useServiceProviderReviews(data.value?.id);
  reviews.serviceProviderId = data.value?.id;

  // State for review modal
  const showReviewModal = ref(false);

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    // @ts-expect-error: Auto-imported from another layer
    const updatedReviews = await useServiceProviderReviews(data.value?.id);
    Object.assign(reviews, updatedReviews);
    reviews.serviceProviderId = data.value?.id;
  }

  const faqItems = computed(() => {
    if (!data.value?.faqs) return [];

    return data.value?.faqs.map(
      (faq: { question: string; answer: string }) => ({
        label: faq.question,
        content: faq.answer,
      }),
    );
  });

  // State for sections
  const sections = ref<string[]>([]);
  // Extract sections from rendered H2 elements
  function extractSections() {
    // Wait for next tick to ensure content is rendered
    nextTick(() => {
      // Get reference to the component's root element
      const containerElement = getCurrentInstance()?.proxy?.$el;

      if (containerElement) {
        // Only select h2 elements within this component
        const h2Elements = containerElement.querySelectorAll('h2');
        const sectionTitles = Array.from(h2Elements).map(
          (h2) => h2.textContent || '',
        );
        sections.value = sectionTitles.filter((title) => title.trim() !== '');
      }
    });
  }

  // Extract sections after component is mounted
  onMounted(() => {
    extractSections();
  });

  // Re-extract if data changes
  watch(
    () => data,
    () => {
      extractSections();
    },
    { deep: true },
  );

  useSeoMeta({
    title: computed(() =>
      data.value?.name
        ? `${data.value.name} - Reviews, Pricing, Features, Alternatives & Deals`
        : 'Service Providers',
    ),
  });
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.description"
      :sections="sections"
      class="bg-background sticky top-0 z-50 transition-all duration-300"
      :image="data.logoUrl"
      :serply-link="data.serplyLink"
    >
      <template #upvote>
        <ServiceProviderEditButton v-if="useAuth" :id="data.id" />
        <ServiceProviderVerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verified"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <JSONRenderer
        v-if="data"
        :value="data"
        base-slug="service-providers"
        category-base-slug="service-providers/best"
      />
    </section>
  </UPage>
</template>

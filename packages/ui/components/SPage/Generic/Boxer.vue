<script setup lang="ts">
  import type { Boxer, Comment } from '@serp/types/types';

  const { user } = useUserSession();
  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params;

  // @ts-expect-error: Auto-imported from another layer
  const data = (await useBoxer(`${slug}`)) as Boxer;
  if (!data) {
    router.push('/404');
  }

  const isVerified = computed(() => {
    return data?.verifiedEmail === user.value?.email;
  });

  const config = useRuntimeConfig();
  const useAuth = config.public.useAuth;

  // Create a consolidated object with all provider details
  const boxerDetails = computed(() => {
    return {};
  });

  // @ts-expect-error: Auto-imported from another layer
  const { comments } = (await useBoxerUpvotesAndComments(data?.id)) as {
    upvotes: string[];
    comments: Comment[];
  };

  // @ts-expect-error: Auto-imported from another layer
  const reviews = await useBoxerReviews(data?.id);
  reviews.boxerId = data?.id;

  // State for review modal
  const showReviewModal = ref(false);

  // Handle review submission - refresh reviews data
  async function handleReviewSubmitted() {
    // @ts-expect-error: Auto-imported from another layer
    const updatedReviews = await useBoxerReviews(data?.id);
    Object.assign(reviews, updatedReviews);
    reviews.boxerId = data?.id;
  }

  // State for sections
  const sections = ref<string[]>([]);
  // Extract sections from rendered H2 elements
  const extractSections = () => {
    // Wait for next tick to ensure content is rendered
    nextTick(() => {
      // Get reference to the component's root element
      const containerElement = getCurrentInstance()?.proxy?.$el;

      if (containerElement) {
        // Only select h2 elements within this component
        const h2Elements = containerElement.querySelectorAll('h2');
        const sectionTitles = Array.from(h2Elements).map(
          (h2) => h2.textContent || ''
        );
        sections.value = sectionTitles.filter((title) => title.trim() !== '');
      }
    });
  };

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
    { deep: true }
  );

  useSeoMeta({
    title: computed(() =>
      data?.name
        ? `${data.name} - Record, Fights, News, and More`
        : 'Boxer - Record, Fights, News, and More'
    )
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
        <BoxerEditButton v-if="useAuth" :id="data.id" />
        <BoxerVerificationButton
          v-if="useAuth"
          :id="data.id"
          :domain="data.slug"
          :is-verified-prop="data.verified"
        />
      </template>
    </MultipageHeader>

    <!-- Main content - single column layout -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <JSONRendererBoxer v-if="data" :value="data" />
    </section>
  </UPage>
</template>

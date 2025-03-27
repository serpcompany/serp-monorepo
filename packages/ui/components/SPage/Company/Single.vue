<template>
  <div v-if="data">
    <MultipageHeader
      :name="data.name"
      :one-liner="data.oneLiner"
      :sections="sections"
      class="bg-background sticky top-0 z-10 transition-all duration-300"
      :image="data.logo"
      :serply_link="data.serplyLink"
    >
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="data.id"
          module="company"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeader>

    <!-- Main content with grid -->
    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <!-- Main Content (70%) -->
        <div class="lg:col-span-2">
          <!-- Overview Section -->
          <CompanyOverview
            v-if="data.excerpt"
            id="overview"
            :company="data"
            class="scroll-mt-60"
          />

          <!-- Article Section -->
          <section
            v-if="data.content"
            class="prose dark:prose-invert mt-[-25px]"
          >
            <div id="article" class="mb-8" v-html="data.content"></div>
          </section>

          <!-- Features Section -->
          <section v-if="data.features" class="mb-12 space-y-4">
            <h2 id="features" class="mb-4 scroll-mt-60 text-3xl font-bold">
              {{ data.name }} Features
            </h2>
            <article v-for="feature in data.features" :key="feature.item">
              <h3 class="mb-2 text-lg font-bold">{{ feature.item }}</h3>
              <p>{{ feature.description }}</p>
            </article>
          </section>

          <!-- FAQs Section -->
          <section v-if="faqItems && faqItems.length" id="faqs" class="mb-12">
            <h2 class="mb-4 scroll-mt-60 text-3xl font-bold">FAQ</h2>
            <UAccordion type="multiple" :items="faqItems" />
          </section>

          <!-- Alternatives -->
          <section v-if="data.alternatives" class="mb-12 p-4">
            <h2 id="alternatives" class="mb-4 scroll-mt-60 text-3xl font-bold">
              {{ data.name }} Alternatives
            </h2>
            <ul class="list-disc pl-4">
              <li v-for="alternative in data.alternatives" :key="alternative">
                {{ alternative }}
              </li>
            </ul>
          </section>

          <!-- Comments Section -->
          <section id="comments" class="mb-12">
            <h2 class="mb-6 scroll-mt-60 text-3xl font-bold">Comments</h2>
            <CommentsContainer
              v-if="useAuth"
              :id="data.id"
              module="company"
              :comments="comments"
              class="comments-github-style"
            />
          </section>
        </div>

        <!-- Sidebar (30%) -->
        <aside
          v-if="
            (data.screenshots && data.screenshots.length) ||
            (data.categories && data.categories.length)
          "
          class="space-y-6 lg:col-span-1"
        >
          <!-- Left Column: Media Gallery -->
          <MediaGallery
            v-if="data.screenshots && data.screenshots.length"
            :company="data"
          />

          <!-- Categories -->
          <section
            v-if="data.categories && data.categories.length"
            class="gap-2"
          >
            <SPill base-slug="products/best" :items="data.categories" />
          </section>
        </aside>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Company, Comment } from '@serp/types/types';

const route = useRoute();
const router = useRouter();
const { slug } = route.params;

const data = (await useCompany(`${slug}`)) as Company;
if (!data) {
  router.push('/404');
}

const config = useRuntimeConfig();
const useAuth = config.public.useAuth;

// When not using caching at the API level, grab the upvotes and comments directly from the data object
// const upvotes = data.upvotes || [];
// const comments = data.comments || [];

// Possibly move to onMounted, but may negatively impact SEO (components currently have onMounted, investigate impact on SEO)
const { upvotes, comments } = (await useCompanyUpvotesAndComments(
  data?.id
)) as { upvotes: string[]; comments: Comment[] };

const faqItems = computed(() => {
  if (!data?.faqs) return [];

  return data?.faqs.map((faq: { question: string; answer: string }) => ({
    label: faq.question,
    content: faq.answer
  }));
});

const sections = computed(() => {
  const sectionTitles: string[] = [];

  sectionTitles.push('Overview');

  if (data?.features) {
    sectionTitles.push('Features');
  }
  if (faqItems.value && faqItems.value.length) {
    sectionTitles.push('FAQ');
  }

  if (data?.alternatives) {
    sectionTitles.push('Alternatives');
  }

  // Add Comments section to navigation
  sectionTitles.push('Comments');

  return sectionTitles;
});

useSeoMeta({
  title: computed(() =>
    data?.name
      ? `${data.name} - Reviews, Pricing, Features`
      : 'Company Information'
  )
});
</script>

<style>
.comments-github-style {
  border: 1px solid var(--color-border, #d0d7de);
  border-radius: 6px;
  margin-top: 16px;
}

.comments-github-style .innerWrapper {
  padding: 16px;
}

.comments-github-style .comment-wrapper {
  border-top: 1px solid var(--color-border, #d0d7de);
  padding-top: 16px;
  margin-top: 16px;
}

.comments-github-style .comment-wrapper:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.comments-github-style .wrapper {
  display: flex;
  gap: 16px;
}

.comments-github-style .addComment {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.comments-github-style .commentBox {
  flex: 1;
  border: 1px solid var(--color-border, #d0d7de);
  border-radius: 6px;
  padding: 8px;
}

.comments-github-style .commentBox textarea {
  width: 100%;
  min-height: 100px;
  padding: 8px;
  border-radius: 3px;
}

.comments-github-style .commentBox button {
  margin-top: 8px;
  padding: 5px 16px;
  border-radius: 6px;
  color: white;
}

.comments-github-style .name-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.comments-github-style .time {
  color: #768390;
  font-size: 0.85em;
}

.comments-github-style .comment {
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 8px;
}

.dark .comments-github-style .comment {
  background-color: #0d1117;
  border-color: #30363d;
}
</style>

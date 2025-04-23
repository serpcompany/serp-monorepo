<script setup lang="ts">
  import type { MCPServer, Comment } from '@serp/types/types';

  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params as { slug: string };

  // @ts-expect-error: auto‑imported
  const data = (await useMCPServer(slug)) as MCPServer;
  if (!data) {
    router.push('/404');
  }

  const useAuth = computed(() => useRuntimeConfig().public.useAuth);

  // @ts-expect-error: auto‑imported
  const { upvotes, comments } = (await useMCPServerUpvotesAndComments(
    data.id
  )) as {
    upvotes: string[];
    comments: Comment[];
  };

  const showReadme = ref(false);

  const sections = computed(() => {
    const s = ['Overview'];
    if (data.contributors?.length) s.push('Contributors');
    if (data.topics?.length) s.push('Topics');
    if (data.languages?.length) s.push('Languages');
    if (data.readme) s.push('Readme');
    s.push('Discussion');
    return s;
  });

  useSeoMeta({
    title: computed(() => `${data.owner}/${data.repo} · MCP Server Details`)
  });
</script>

<template>
  <UPage v-if="data">
    <MultipageHeader
      :name="`${data.owner}/${data.repo}`"
      :one-liner="data.description"
      :sections="sections"
      class="bg-background sticky top-0 z-50"
    >
      <template #upvote>
        <UpvoteButton
          v-if="useAuth"
          :id="data.id"
          module="mcp-server"
          :upvotes="upvotes"
        />
      </template>
    </MultipageHeader>

    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Overview -->
      <UCard
        id="overview"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center">
            <h2 class="text-xl font-semibold">Overview</h2>
          </div>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 space-y-4">
          <p class="text-gray-700 dark:text-gray-300">{{ data.description }}</p>
          <div class="flex flex-wrap gap-2">
            <NuxtLink :href="data.url" target="_blank" class="underline">
              View on GitHub
            </NuxtLink>
          </div>
        </div>
      </UCard>

      <!-- Contributors -->
      <UCard
        v-if="data.contributors?.length"
        id="contributors"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Contributors</h2>
        </template>
        <UDivider class="my-0" />
        <ul
          class="mt-4 list-inside list-disc space-y-1 text-gray-700 dark:text-gray-300"
        >
          <li v-for="c in data.contributors" :key="c">{{ c }}</li>
        </ul>
      </UCard>

      <!-- Topics -->
      <UCard
        v-if="data.topics?.length"
        id="topics"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Topics</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 flex flex-wrap gap-2">
          <SPill
            base-slug="mcp/servers/topic"
            :items="
              data.topics.map((t) => ({ name: t, slug: encodeURIComponent(t) }))
            "
          />
        </div>
      </UCard>

      <!-- Languages -->
      <UCard
        v-if="data.languages?.length"
        id="languages"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Languages</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 flex flex-wrap gap-2">
          <SPill :items="data.languages.map((l) => ({ label: l }))" />
        </div>
      </UCard>

      <!-- Readme -->
      <UCard
        v-if="data.readme"
        id="readme"
        class="mb-8 scroll-mt-20 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold">Readme</h2>
            <button
              class="text-sm text-blue-600 dark:text-blue-400"
              @click="showReadme = !showReadme"
            >
              {{ showReadme ? 'Hide' : 'Show' }}
            </button>
          </div>
        </template>
        <UDivider class="my-0" />
        <div
          v-show="showReadme"
          class="prose dark:prose-invert mt-4 max-w-none"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="data.readme"></div>
        </div>
      </UCard>

      <!-- Discussion -->
      <UCard
        id="discussion"
        class="rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Discussion</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4">
          <CommentsContainer
            v-if="useAuth"
            :id="data.id"
            module="mcp-servers"
            :comments="comments"
            class="comments-github-style"
          />
        </div>
      </UCard>
    </section>
  </UPage>
</template>

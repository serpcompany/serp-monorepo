<script setup lang="ts">
  import type { MCPServer, Comment } from '@serp/types/types';

  const route = useRoute();
  const router = useRouter();
  const { slug } = route.params as { slug: string };

  const data = (await useMCPServer(slug)) as MCPServer;
  if (!data) {
    router.push('/404');
  }

  const useAuth = computed(() => useRuntimeConfig().public.useAuth);

  const { comments } = (await useMCPServerComments(data.id)) as {
    comments: Comment[];
  };

  const showReadme = ref(true);

  const sections = computed(() => {
    const s = ['Overview'];
    if (data.contributors?.length) s.push('Contributors');
    if (data.categories?.length) s.push('Categories');
    if (data.topics?.length) s.push('Topics');
    if (data.tags?.length) s.push('Tags');
    if (data.languages) s.push('Languages');
    if (data.readme) s.push('Readme');
    s.push('Discussion');
    return s;
  });

  const languageCounts = computed<Record<string, number>>(
    () => data.languages || {}
  );
  const totalLines = computed(() =>
    Object.values(languageCounts.value).reduce((sum, n) => sum + n, 0)
  );
  const languagesChartData = computed(() => {
    // grab [name, count] entries and sort ascending by count
    const entries = Object.entries(languageCounts.value).sort(
      ([, a], [, b]) => a - b
    );

    return entries.map(([name, count], i) => {
      const pct = (count / totalLines.value) * 100;
      const hue = (i / entries.length) * 360;
      return {
        name,
        count,
        percent: pct,
        color: `hsl(${hue}, 70%, 50%)`
      };
    });
  });

  const llmsText = ref(data.llmsText);

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
      :serply-link="data.serplyLink || data.url"
      class="bg-background sticky top-0 z-50"
    >
      <template #upvote>
        <VoteButton
          v-if="useAuth"
          :id="data.id"
          module="mcp_server"
          :users-current-vote="data.usersCurrentVote"
          :upvotes="data.numUpvotes"
          :downvotes="data.numDownvotes"
        />
      </template>
    </MultipageHeader>

    <section class="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
      <!-- Overview -->
      <UCard
        id="overview"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
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
        </div>
      </UCard>

      <!-- llm-text ara -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <UTooltip text="Tokens">
              <UInput
                label="asdf"
                icon="i-lucide-coins"
                size="md"
                variant="outline"
              />
            </UTooltip>
            <div class="justify-right flex items-center gap-2">
              <UButton>Copy</UButton>
              <UButton>Link</UButton>
              <UButton>Raw</UButton>
            </div>
          </div>
        </template>

        <UTextarea v-model="llmsText" :rows="15" :ui="{ root: 'flex' }" />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>

      <!-- Contributors -->
      <UCard
        v-if="data.contributors?.length"
        id="contributors"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Contributors</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 text-gray-700 dark:text-gray-300">
          {{ data.contributors.join(', ') }}
        </div>
      </UCard>

      <!-- Categories -->
      <UCard
        v-if="data.categories?.length"
        id="categories"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Categories</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 flex flex-wrap gap-2">
          <SPill base-slug="mcp/servers/category" :items="data.categories" />
        </div>
      </UCard>

      <!-- Tags -->
      <UCard
        v-if="data.tags?.length"
        id="tags"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Tags</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="tag in data.tags"
            :key="tag"
            class="inline-flex rounded-full bg-[var(--ui-color-secondary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-secondary-700)] dark:bg-[var(--ui-color-secondary-900)]/30 dark:text-[var(--ui-color-secondary-200)]"
          >
            {{ tag }}
          </span>
        </div>
      </UCard>

      <!-- Topics -->
      <UCard
        v-if="data.topics?.length"
        id="topics"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Topics</h2>
        </template>
        <UDivider class="my-0" />
        <div class="mt-4 flex flex-wrap gap-2">
          <span
            v-for="topic in data.topics"
            :key="topic"
            class="inline-flex rounded-full bg-[var(--ui-color-primary-50)] px-3 py-1 text-xs font-medium text-[var(--ui-color-primary-700)] dark:bg-[var(--ui-color-primary-900)]/30 dark:text-[var(--ui-color-primary-200)]"
          >
            {{ topic }}
          </span>
        </div>
      </UCard>

      <!-- Languages -->
      <UCard
        v-if="data.languages"
        id="languages"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
        :ui="{ body: { padding: 'p-4 sm:p-6' } }"
      >
        <template #header>
          <h2 class="text-xl font-semibold">Languages</h2>
        </template>

        <UDivider class="my-0" />

        <div class="mt-4 space-y-6">
          <!-- BAR CHART -->
          <div>
            <div
              class="flex h-4 w-full overflow-hidden rounded bg-gray-200 dark:bg-gray-700"
            >
              <div
                v-for="lang in languagesChartData"
                :key="lang.name"
                class="h-full"
                :style="{
                  width: `${lang.percent}%`,
                  backgroundColor: lang.color
                }"
                :title="`${lang.name}: ${lang.percent.toFixed(1)}%`"
              ></div>
            </div>
            <div class="mt-2 flex flex-wrap gap-4 text-sm">
              <div
                v-for="lang in languagesChartData"
                :key="lang.name"
                class="flex items-center space-x-1"
              >
                <span
                  class="block h-3 w-3 rounded"
                  :style="{ backgroundColor: lang.color }"
                ></span>
                <span>{{ lang.name }} ({{ lang.percent.toFixed(1) }}%)</span>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Readme -->
      <UCard
        v-if="data.readme"
        id="readme"
        class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
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

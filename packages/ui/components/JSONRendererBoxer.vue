<script setup lang="ts">
  const props = defineProps<{
    value: unknown;
    key_?: string;
  }>();
  const typeofValue = typeof props.value;
  const itemsAreObjects = computed(
    () =>
      Array.isArray(props.value) &&
      props.value.length > 0 &&
      props.value.every(
        (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
      )
  );
  const columns = computed(() => {
    if (!itemsAreObjects.value) return [];
    const keySet = new Set<string>();
    (props.value as Record<string, unknown>[]).forEach((obj) =>
      Object.keys(obj).forEach((k) => keySet.add(k))
    );
    return [...keySet];
  });
  // remove these from showing on the frontend
  const blacklistKeys = [
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'created_at',
    'updated_at',
    'deleted_at',
    'slug',
    'logoUrl',
    'title',
    'excerpt'
  ];
  // rename these keys to show on the frontend
  const renameKeysMapping = {
    basicInfo: 'Overview'
  };

  // Convert camelCase/PascalCase to human-readable format
  const formatKey = (key: string): string => {
    // Check if there's a manual mapping first
    if (renameKeysMapping[key]) {
      return renameKeysMapping[key];
    }

    // Handle camelCase and PascalCase
    return (
      key
        // Insert space before capital letters (for camelCase)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        // Insert space before numbers that follow letters
        .replace(/([a-zA-Z])(\d)/g, '$1 $2')
        // Handle consecutive capitals (e.g., "ID" or "URL")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        // Handle snake_case
        .replace(/_/g, ' ')
        // Handle kebab-case
        .replace(/-/g, ' ')
        // Capitalize first letter of each word
        .replace(/\b\w/g, (letter) => letter.toUpperCase())
        // Special cases
        .replace(/\bId\b/g, 'ID')
        .replace(/\bUrl\b/g, 'URL')
        .replace(/\bApi\b/g, 'API')
        .replace(/\bCeo\b/g, 'CEO')
        .replace(/\bCto\b/g, 'CTO')
        .replace(/\bUi\b/g, 'UI')
        .replace(/\bUx\b/g, 'UX')
    );
  };

  // Track nesting level for proper heading hierarchy
  const nestingLevel = inject('jsonNestingLevel', 0);
  provide('jsonNestingLevel', nestingLevel + 1);

  const getHeadingTag = (level: number) => {
    const tags = ['h2', 'h3', 'h4', 'h5', 'h6'];
    return tags[Math.min(level, tags.length - 1)];
  };

  const getHeadingClass = (level: number) => {
    const classes = [
      'text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4', // h2
      'text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3', // h3
      'text-lg font-medium text-gray-700 dark:text-gray-300 mb-2', // h4
      'text-base font-medium text-gray-600 dark:text-gray-400 mb-2', // h5
      'text-sm font-medium text-gray-500 dark:text-gray-400 mb-1' // h6
    ];
    return classes[Math.min(level, classes.length - 1)];
  };

  // Determine if a key should be wrapped in a card (top-level sections)
  const shouldWrapInCard = (key: string, level: number) => {
    // Only wrap top-level keys in cards
    return (
      level === 0 &&
      typeof props.value === 'object' &&
      !Array.isArray(props.value) &&
      !blacklistKeys.includes(key)
    );
  };

  // Add a helper to check if a value is a primitive
  const isPrimitive = (val: unknown): boolean => {
    return (
      val === null ||
      val === undefined ||
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean'
    );
  };

  // Check if we should display key-value on the same line
  const shouldDisplayInline = (value: unknown, level: number): boolean => {
    return isPrimitive(value) && level >= 2; // Only inline for h3+ level content
  };
</script>
<template>
  <div>
    <HTMLRenderer v-if="key_ === 'readme'" :value="value" />
    <!-- primitives & null/undefined -->
    <NullRenderer v-else-if="value === null" :value="value" />
    <UndefinedRenderer v-else-if="typeofValue === 'undefined'" :value="value" />
    <StringRenderer v-else-if="typeofValue === 'string'" :value="value" />
    <NumberRenderer v-else-if="typeofValue === 'number'" :value="value" />
    <BooleanRenderer v-else-if="typeofValue === 'boolean'" :value="value" />
    <!-- arrays -->
    <div v-else-if="Array.isArray(value)" class="space-y-4">
      <!-- array of objects -> structured sections -->
      <div v-if="itemsAreObjects" class="space-y-8">
        <div v-for="(item, index) in value" :key="index" class="space-y-4">
          <component
            :is="getHeadingTag(nestingLevel)"
            v-if="value.length > 1"
            :class="getHeadingClass(nestingLevel)"
          >
            Item {{ index + 1 }}
          </component>
          <div class="space-y-6">
            <template v-for="(itemValue, itemKey) in item" :key="itemKey">
              <div
                v-if="
                  itemValue !== null &&
                  itemValue !== undefined &&
                  !blacklistKeys.includes(itemKey)
                "
              >
                <component
                  :is="getHeadingTag(nestingLevel + 1)"
                  :class="getHeadingClass(nestingLevel + 1)"
                >
                  {{ formatKey(itemKey) }}
                </component>
                <div class="ml-4">
                  <JSONRenderer :value="itemValue" :key_="itemKey" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- everything else -> list items -->
      <ul v-else class="list-disc space-y-2 pl-5">
        <li v-for="(item, i) in value" :key="i">
          <JSONRenderer :value="item" />
        </li>
      </ul>
    </div>
    <!-- objects -->
    <div v-else class="space-y-6">
      <template v-for="(v, k) in value" :key="k">
        <!-- Wrap top-level sections in UCard -->
        <UCard
          v-if="
            shouldWrapInCard(k, nestingLevel) && v !== null && v !== undefined
          "
          :id="k"
          class="mb-8 scroll-mt-30 rounded-md border border-gray-200 dark:border-gray-800"
          :ui="{ body: { padding: 'p-4 sm:p-6' } }"
        >
          <template #header>
            <div class="flex items-center px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
              <h2
                class="text-xl font-semibold text-gray-900 dark:text-gray-300"
              >
                {{ formatKey(k) }}
              </h2>
              <UIcon
                name="i-heroicons-link"
                class="ml-2 h-4 w-4 text-gray-400"
              />
            </div>
          </template>
          <UDivider class="my-0" />
          <div class="p-4 sm:p-6">
            <JSONRenderer :value="v" :key_="k" />
          </div>
        </UCard>

        <!-- Display primitive values on the same line ONLY for h3+ levels -->
        <div
          v-else-if="
            v !== null &&
            v !== undefined &&
            !blacklistKeys.includes(k) &&
            shouldDisplayInline(v, nestingLevel)
          "
          class="mb-2 flex items-baseline gap-2"
        >
          <span class="font-medium text-gray-700 dark:text-gray-300">
            {{ formatKey(k) }}:
          </span>
          <JSONRenderer :value="v" :key_="k" />
        </div>

        <!-- Standard rendering for h2 level content and non-primitive values -->
        <div
          v-else-if="
            v !== null && v !== undefined && !blacklistKeys.includes(k)
          "
          class="mb-4 space-y-2"
        >
          <component
            :is="getHeadingTag(nestingLevel)"
            :class="getHeadingClass(nestingLevel)"
          >
            {{ formatKey(k) }}
          </component>
          <div :class="nestingLevel > 0 ? 'ml-4' : ''">
            <JSONRenderer :value="v" :key_="k" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

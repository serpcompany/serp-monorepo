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

  // Check if the array of objects should be rendered as a table
  const shouldRenderAsTable = computed(() => {
    if (!itemsAreObjects.value) return false;

    // For fights, always render as table
    if (props.key_ === 'fights') return true;

    // For other arrays, check if they have consistent structure
    const objects = props.value as Record<string, unknown>[];
    if (objects.length < 2) return false;

    // Get keys that have values in the first object
    const firstKeys = Object.keys(objects[0])
      .filter((key) => !isEmptyValue(objects[0][key]))
      .sort()
      .join(',');

    // Check if all objects have the same keys with values
    return objects.every((obj) => {
      const objKeys = Object.keys(obj)
        .filter((key) => !isEmptyValue(obj[key]))
        .sort()
        .join(',');
      return objKeys === firstKeys;
    });
  });
  const columns = computed(() => {
    if (!itemsAreObjects.value) return [];
    const keySet = new Set<string>();
    (props.value as Record<string, unknown>[]).forEach((obj) => {
      Object.keys(obj).forEach((k) => {
        if (!isEmptyValue(obj[k])) {
          keySet.add(k);
        }
      });
    });

    // Define specific column order for fights
    if (props.key_ === 'fights') {
      const fightColumns = [
        'date',
        'result',
        'result_round',
        'scheduled_rounds',
        'venue',
        'boxer_a',
        'boxer_b'
      ];
      return fightColumns.filter((col) => keySet.has(col));
    }

    return [...keySet];
  });
  // remove these from showing on the frontend
  const blacklistKeys = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'created_at',
    'updated_at',
    'deleted_at',
    'slug',
    'logoUrl',
    'excerpt'
  ];
  // rename these keys to show on the frontend
  const renameKeysMapping = {
    birth_name: 'Birth Name',
    boxrec_image: 'Image',
    boxrec_url: 'BoxRec URL',
    career: 'Career Timeline',
    debut: 'Professional Debut',
    boxrec_id: 'BoxRec ID',
    status: 'Status',
    gender: 'Gender',
    nationality: 'Nationality',
    height_cm: 'Height (cm)',
    residence: 'Residence',
    nicknames: 'Nicknames',
    stance: 'Stance',
    birth_place: 'Birth Place',
    reach_cm: 'Reach (cm)',
    content: 'About',
    weight_class: 'Weight Class',
    fights: 'Fight History',
    name: 'Fighter Name',
    date: 'Date',
    result: 'Result',
    result_round: 'Round',
    scheduled_rounds: 'Scheduled Rounds',
    venue: 'Venue',
    location: 'Location',
    boxer_a: 'Fighter A',
    boxer_b: 'Fighter B'
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

  // Helper to render the appropriate heading element
  const renderHeading = (level: number, text: string) => {
    const tag = getHeadingTag(level);
    const className = getHeadingClass(level);
    return { tag, className, text };
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

  // Check if a value is empty
  const isEmptyValue = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string' && value.trim() === '') return true;
    if (Array.isArray(value) && value.length === 0) return true;
    if (typeof value === 'object' && Object.keys(value).length === 0)
      return true;
    return false;
  };

  // Format table columns for UTable
  const tableColumns = computed(() => {
    if (!itemsAreObjects.value) return [];

    const items = props.value as Record<string, unknown>[];
    const allKeys = new Set<string>();

    items.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (!blacklistKeys.includes(key) && !isEmptyValue(item[key])) {
          allKeys.add(key);
        }
      });
    });

    let cols = Array.from(allKeys);

    // Define specific column order for fights
    if (props.key_ === 'fights') {
      const fightColumns = [
        'date',
        'result',
        'result_round',
        'scheduled_rounds',
        'venue',
        'boxer_a',
        'boxer_b'
      ];
      cols = fightColumns.filter((col) => allKeys.has(col));
    }

    return cols.map((key) => ({
      key,
      label: formatKey(key),
      sortable: true
    }));
  });

  // Process table data to extract nested values
  const tableData = computed(() => {
    if (!shouldRenderAsTable.value || !itemsAreObjects.value) return [];

    const items = props.value as Record<string, unknown>[];
    return items.map((item) => {
      const processedItem = {};

      Object.entries(item).forEach(([key, value]) => {
        if (isEmptyValue(value)) return; // Skip empty values

        if (typeof value === 'object' && value !== null) {
          // Handle nested objects by extracting specific values
          if (key === 'venue' && 'location' in value) {
            processedItem[key] = value.location || 'TBA';
          } else if (
            (key === 'boxer_a' || key === 'boxer_b') &&
            'name' in value
          ) {
            processedItem[key] = value.name;
          } else {
            // For other objects, stringify them
            processedItem[key] = JSON.stringify(value);
          }
        } else {
          processedItem[key] = value || 'TBA';
        }
      });

      return processedItem;
    });
  });
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
      <!-- Force table for fights data -->
      <div v-if="key_ === 'fights' && itemsAreObjects">
        <UTable
          :columns="[
            { key: 'date', label: 'Date', sortable: true },
            { key: 'result', label: 'Result', sortable: true },
            { key: 'result_round', label: 'Round', sortable: true },
            {
              key: 'scheduled_rounds',
              label: 'Scheduled Rounds',
              sortable: true
            },
            { key: 'venue', label: 'Venue', sortable: true },
            { key: 'boxer_a', label: 'Fighter A', sortable: true },
            { key: 'boxer_b', label: 'Fighter B', sortable: true }
          ]"
          :rows="tableData"
          class="w-full"
          :ui="{
            td: { base: 'whitespace-nowrap' },
            th: { base: 'whitespace-nowrap' }
          }"
        />
      </div>
      <!-- array of objects that should be rendered as table -->
      <div v-else-if="shouldRenderAsTable && !key_.startsWith('fights')">
        <UTable
          :columns="tableColumns"
          :rows="tableData"
          class="w-full"
          :ui="{
            td: { base: 'whitespace-nowrap' },
            th: { base: 'whitespace-nowrap' }
          }"
        />
      </div>
      <!-- array of objects -> structured sections -->
      <div v-else-if="itemsAreObjects" class="space-y-8">
        <div v-for="(item, index) in value" :key="index" class="space-y-4">
          <!-- Dynamic heading based on nesting level -->
          <h2
            v-if="nestingLevel === 0 && value.length > 1"
            :class="getHeadingClass(0)"
          >
            {{
              key_ === 'fights'
                ? `Fight ${value.length - index}`
                : `Item ${index + 1}`
            }}
          </h2>
          <h3
            v-else-if="nestingLevel === 1 && value.length > 1"
            :class="getHeadingClass(1)"
          >
            {{
              key_ === 'fights'
                ? `Fight ${value.length - index}`
                : `Item ${index + 1}`
            }}
          </h3>
          <h4
            v-else-if="nestingLevel === 2 && value.length > 1"
            :class="getHeadingClass(2)"
          >
            {{
              key_ === 'fights'
                ? `Fight ${value.length - index}`
                : `Item ${index + 1}`
            }}
          </h4>
          <h5
            v-else-if="nestingLevel === 3 && value.length > 1"
            :class="getHeadingClass(3)"
          >
            {{
              key_ === 'fights'
                ? `Fight ${value.length - index}`
                : `Item ${index + 1}`
            }}
          </h5>
          <h6 v-else-if="value.length > 1" :class="getHeadingClass(4)">
            {{
              key_ === 'fights'
                ? `Fight ${value.length - index}`
                : `Item ${index + 1}`
            }}
          </h6>

          <div class="space-y-6">
            <template v-for="(itemValue, itemKey) in item" :key="itemKey">
              <div
                v-if="
                  !isEmptyValue(itemValue) && !blacklistKeys.includes(itemKey)
                "
              >
                <!-- Nested heading based on level -->
                <h3
                  v-if="
                    nestingLevel === 0 &&
                    !shouldDisplayInline(itemValue, nestingLevel + 1)
                  "
                  :class="getHeadingClass(1)"
                >
                  {{ formatKey(itemKey) }}
                </h3>
                <h4
                  v-else-if="
                    nestingLevel === 1 &&
                    !shouldDisplayInline(itemValue, nestingLevel + 1)
                  "
                  :class="getHeadingClass(2)"
                >
                  {{ formatKey(itemKey) }}
                </h4>
                <h5
                  v-else-if="
                    nestingLevel === 2 &&
                    !shouldDisplayInline(itemValue, nestingLevel + 1)
                  "
                  :class="getHeadingClass(3)"
                >
                  {{ formatKey(itemKey) }}
                </h5>
                <h6
                  v-else-if="!shouldDisplayInline(itemValue, nestingLevel + 1)"
                  :class="getHeadingClass(4)"
                >
                  {{ formatKey(itemKey) }}
                </h6>

                <div
                  :class="
                    shouldDisplayInline(itemValue, nestingLevel) ? '' : 'ml-4'
                  "
                >
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
          v-if="shouldWrapInCard(k, nestingLevel) && !isEmptyValue(v)"
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
            !isEmptyValue(v) &&
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
          v-else-if="!isEmptyValue(v) && !blacklistKeys.includes(k)"
          class="mb-4 space-y-2"
        >
          <!-- Dynamic heading based on nesting level -->
          <h2
            v-if="nestingLevel === 0 && !['name'].includes(k)"
            :class="getHeadingClass(0)"
          >
            {{ formatKey(k) }}
          </h2>
          <h3
            v-else-if="nestingLevel === 1 && !['name'].includes(k)"
            :class="getHeadingClass(1)"
          >
            {{ formatKey(k) }}
          </h3>
          <h4
            v-else-if="nestingLevel === 2 && !['name'].includes(k)"
            :class="getHeadingClass(2)"
          >
            {{ formatKey(k) }}
          </h4>
          <h5
            v-else-if="nestingLevel === 3 && !['name'].includes(k)"
            :class="getHeadingClass(3)"
          >
            {{ formatKey(k) }}
          </h5>
          <h6 v-else-if="!['name'].includes(k)" :class="getHeadingClass(4)">
            {{ formatKey(k) }}
          </h6>

          <div
            :class="['name'].includes(k) ? '' : nestingLevel > 0 ? 'ml-4' : ''"
          >
            <JSONRenderer :value="v" :key_="k" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

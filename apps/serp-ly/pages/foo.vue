<script setup lang="ts">
  import type { Link } from '@serp/types/types/Link';

  const { loggedIn, user } = useUserSession();
  if (!loggedIn.value) {
    navigateTo('/');
  }

  interface LinkFormData {
    url: string;
    slug: string;
    comment: string;
    title: string;
    description: string;
    image: string;
  }

  const linkData = ref<LinkFormData>({
    url: '',
    slug: '',
    comment: '',
    title: '',
    description: '',
    image: ''
  });

  const shortLink = ref('');
  const loading = ref(false);
  const toast = useToast();

  interface FieldDefinition {
    key: keyof LinkFormData;
    label: string;
  }

  const requiredFields: FieldDefinition[] = [{ key: 'url', label: 'URL' }];

  const isFormValid = computed(() => {
    return requiredFields.every(
      (field) =>
        linkData.value[field.key] && linkData.value[field.key].trim() !== ''
    );
  });

  interface LinkResponse {
    link?: Link;
    shortLink?: string;
    status?: number;
    message?: string;
  }

  async function createLink() {
    try {
      loading.value = true;

      if (!isFormValid.value) {
        throw new Error('Please fill in all required fields');
      }

      if (!user.value?.email) {
        throw new Error('Please login to create a short link');
      }

      const { data: response, error } = await useFetch<LinkResponse>(
        '/api/link/create',
        {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: linkData.value
        }
      );

      if (error.value) {
        throw new Error(`Failed to create link - ${error.value.message}`);
      }

      if (response.value?.shortLink) {
        shortLink.value = response.value.shortLink;
        toast.add({
          id: 'link-created',
          title: 'Link Created',
          description: 'Your short link has been created successfully',
          icon: 'check-circle'
        });
      } else {
        throw new Error('Failed to create link - No response received');
      }
    } catch (error: unknown) {
      toast.add({
        id: 'link-create-error',
        title: 'Error creating link',
        description:
          error instanceof Error ? error.message : 'Unknown error occurred',
        icon: 'exclamation-circle'
      });
    } finally {
      loading.value = false;
    }
  }

  function resetForm() {
    linkData.value = {
      url: '',
      slug: '',
      comment: '',
      title: '',
      description: '',
      image: ''
    };
    shortLink.value = '';
  }

  function copyToClipboard() {
    if (shortLink.value) {
      navigator.clipboard
        .writeText(shortLink.value)
        .then(() => {
          toast.add({
            id: 'copy-success',
            title: 'Copied!',
            description: 'Link copied to clipboard',
            icon: 'check-circle'
          });
        })
        .catch(() => {
          toast.add({
            id: 'copy-error',
            title: 'Copy Failed',
            description: 'Failed to copy link to clipboard',
            icon: 'exclamation-circle'
          });
        });
    }
  }
</script>

<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <!-- Left side column -->
      <div class="col-span-1 space-y-4">
        <!-- Preview Card -->
        <UCard v-if="shortLink">
          <div class="p-3">
            <h3 class="text-lg font-medium">Your Short Link</h3>
            <p class="mb-2 text-sm text-neutral-600">
              This is your generated short link
            </p>
            <UInput v-model="shortLink" readonly class="mb-2" />
            <UButton variant="soft" size="sm" block @click="copyToClipboard">
              Copy Link
            </UButton>
          </div>
        </UCard>

        <!-- Completion Status Card -->
        <UCard>
          <div class="p-3">
            <h3 class="text-lg font-medium">
              {{ isFormValid ? '✅ Valid' : '❌ Invalid' }}
            </h3>
            <p class="mb-2 text-xs text-neutral-600">
              Required fields must be filled before creating a link
            </p>
            <div class="grid grid-cols-2 gap-1">
              <div
                v-for="field in requiredFields"
                :key="field.key"
                class="flex items-center text-xs"
              >
                <span class="mr-1">{{
                  linkData[field.key as keyof typeof linkData] ? '✅' : '❌'
                }}</span>
                <span>{{ field.label }}</span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <UButton
            color="primary"
            :loading="loading"
            :disabled="!isFormValid"
            @click="createLink"
            >Create Short Link
          </UButton>
          <UButton variant="outline" @click="resetForm">Reset Form</UButton>
        </div>
      </div>

      <!-- Right side column (Form) -->
      <div class="col-span-2">
        <UCard>
          <form @submit.prevent="createLink">
            <div class="grid grid-cols-2 gap-4 p-4">
              <UFormField
                label="URL"
                help="Enter the URL you want to shorten"
                required
                class="col-span-2"
              >
                <UInput
                  v-model="linkData.url"
                  placeholder="https://example.com/long-url-to-shorten"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Slug"
                help="Custom URL slug (optional, will generate automatically if empty)"
                class="col-span-1"
              >
                <UInput
                  v-model="linkData.slug"
                  placeholder="custom-slug"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Title"
                help="Optional title for the link"
                class="col-span-1"
              >
                <UInput
                  v-model="linkData.title"
                  placeholder="Link Title"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Description"
                help="Optional description for the link"
                class="col-span-2"
              >
                <UTextarea
                  v-model="linkData.description"
                  placeholder="Enter a description for this link"
                  :rows="3"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Comment"
                help="Optional personal comment about this link"
                class="col-span-2"
              >
                <UTextarea
                  v-model="linkData.comment"
                  placeholder="Add a personal comment (only visible to you)"
                  :rows="2"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="Image URL"
                help="Optional image URL for the link preview"
                class="col-span-2"
              >
                <UInput
                  v-model="linkData.image"
                  placeholder="https://example.com/image.jpg"
                  class="w-full"
                />
              </UFormField>
            </div>
          </form>
        </UCard>
      </div>
    </div>
  </div>
</template>

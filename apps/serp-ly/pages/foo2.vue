<template>
  <div class="p-4">
    <div class="grid grid-cols-3 gap-4">
      <!-- Left Side: Instructions & Refresh -->
      <div class="col-span-1 space-y-4">
        <UCard>
          <div class="p-3">
            <h3 class="text-lg font-medium">Link Management</h3>
            <p class="mb-2 text-sm text-neutral-600">
              View, edit, or delete your short links.
            </p>
            <UButton variant="soft" size="sm" block @click="fetchLinks">
              Refresh List
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Right Side: Edit Form (if active) and Link List -->
      <div class="col-span-2 space-y-4">
        <!-- Edit Card: Only shows if a link is selected for editing -->
        <UCard v-if="isEditing">
          <div class="p-4">
            <h3 class="mb-4 text-lg font-medium">Edit Link</h3>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="URL" required class="col-span-2">
                <UInput
                  v-model="editLinkData.url"
                  placeholder="https://example.com"
                />
              </UFormField>
              <UFormField label="Slug" required class="col-span-1">
                <UInput v-model="editLinkData.slug" placeholder="custom-slug" />
              </UFormField>
              <UFormField label="Title" class="col-span-1">
                <UInput v-model="editLinkData.title" placeholder="Link Title" />
              </UFormField>
              <UFormField label="Description" class="col-span-2">
                <UTextarea
                  v-model="editLinkData.description"
                  placeholder="Link Description"
                  rows="3"
                />
              </UFormField>
              <UFormField label="Comment" class="col-span-2">
                <UTextarea
                  v-model="editLinkData.comment"
                  placeholder="Personal Comment"
                  rows="2"
                />
              </UFormField>
              <UFormField label="Image URL" class="col-span-2">
                <UInput
                  v-model="editLinkData.image"
                  placeholder="https://example.com/image.jpg"
                />
              </UFormField>
            </div>
            <div class="mt-4 flex justify-end space-x-2">
              <UButton variant="outline" @click="cancelEdit">Cancel</UButton>
              <UButton
                color="primary"
                :loading="loadingUpdate"
                @click="updateLink"
                >Save</UButton
              >
            </div>
          </div>
        </UCard>

        <!-- Link List Card -->
        <UCard>
          <div class="p-4">
            <h3 class="mb-4 text-lg font-medium">Your Short Links</h3>
            <div v-if="loadingList" class="text-center text-neutral-600">
              Loading links...
            </div>
            <div v-else>
              <div v-if="links.length">
                <div
                  v-for="link in links"
                  :key="link.slug"
                  class="flex items-center justify-between border-b py-2"
                >
                  <div>
                    <p class="font-medium">{{ link.slug }}</p>
                    <p class="text-sm text-neutral-600">{{ link.url }}</p>
                  </div>
                  <div class="space-x-2">
                    <UButton
                      variant="outline"
                      color="primary"
                      size="sm"
                      @click="openEditCard(link)"
                    >
                      Edit
                    </UButton>
                    <UButton
                      variant="outline"
                      color="danger"
                      size="sm"
                      @click="deleteLink(link.slug)"
                    >
                      Delete
                    </UButton>
                  </div>
                </div>
              </div>
              <div v-else class="text-neutral-600">No links found.</div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Link } from '@serp/types/types/Link';
import { useShortlinks } from '@serp/utils-cloudflare-pages/composables/useShortlinks';
const { loggedIn } = useUserSession();
if (!loggedIn.value) {
  navigateTo('/');
}

const links = ref<Link[]>([]);
const loadingList = ref(false);
const loadingUpdate = ref(false);
const toast = useToast();

// Fetch links from the API
async function fetchLinks() {
  loadingList.value = true;
  try {
    const record = await useShortlinks();
    if (record) {
      if (record.data) {
        links.value = JSON.parse(record.data);
      } else {
        links.value = [];
      }
    } else {
      links.value = [];
    }
  } catch (err: unknown) {
    toast.add({
      id: 'fetch-links-error',
      title: 'Error fetching links',
      description: err.message || 'Unknown error occurred',
      icon: 'exclamation-circle'
    });
  } finally {
    loadingList.value = false;
  }
}

await fetchLinks();

// Delete a link by its slug
async function deleteLink(slug: string) {
  try {
    const { error } = await useFetch('/api/link/delete', {
      method: 'POST',
      headers: useRequestHeaders(['cookie']),
      body: { slug }
    });
    if (error.value) {
      throw new Error(error.value.message || 'Failed to delete link');
    }
    toast.add({
      id: `delete-success-${slug}`,
      title: 'Link Deleted',
      description: `Link with slug "${slug}" has been deleted.`,
      icon: 'check-circle'
    });
    fetchLinks();
  } catch (err: unknown) {
    toast.add({
      id: `delete-error-${slug}`,
      title: 'Error deleting link',
      description: err.message || 'Unknown error occurred',
      icon: 'exclamation-circle'
    });
  }
}

// Edit card handling
const editLinkData = ref<Partial<Link> & { originalSlug?: string }>({
  url: '',
  slug: '',
  comment: '',
  title: '',
  description: '',
  image: '',
  originalSlug: ''
});
const isEditing = computed(() => !!editLinkData.value.originalSlug);

function openEditCard(link: Link) {
  console.log('Edit clicked for link:', link);
  // Copy link data into the edit form and store the original slug for reference
  editLinkData.value = { ...link, originalSlug: link.slug };
}

function cancelEdit() {
  editLinkData.value = {
    url: '',
    slug: '',
    comment: '',
    title: '',
    description: '',
    image: '',
    originalSlug: ''
  };
}

// Update link using the update endpoint
async function updateLink() {
  loadingUpdate.value = true;
  try {
    const { error } = await useFetch('/api/link/update', {
      method: 'PUT',
      headers: useRequestHeaders(['cookie']),
      body: editLinkData.value
    });
    if (error.value) {
      throw new Error(error.value.message || 'Failed to update link');
    }
    toast.add({
      id: `update-success-${editLinkData.value.originalSlug}`,
      title: 'Link Updated',
      description: `Link with slug "${editLinkData.value.originalSlug}" has been updated.`,
      icon: 'check-circle'
    });
    cancelEdit();
    fetchLinks();
  } catch (err: unknown) {
    toast.add({
      id: `update-error-${editLinkData.value.originalSlug}`,
      title: 'Error updating link',
      description: err.message || 'Unknown error occurred',
      icon: 'exclamation-circle'
    });
  } finally {
    loadingUpdate.value = false;
  }
}
</script>

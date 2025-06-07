<script setup lang="ts">
  import type { FormSubmitEvent } from '@nuxt/ui'
  import type { InsertPost, Post } from '@serp/db/types/database'
  import { useDateFormat } from '@vueuse/core'
  import { z } from 'zod'

  const { currentTeam } = useTeam()
  const toast = useToast()
  const loading = ref(false)
  const deletingPostId = ref<string | null>(null)
  const selectedFile = ref<File | null>(null)

  const postModal = reactive({
    isOpen: false,
    isEdit: false,
    editId: null as string | null,
  })

  const deleteModal = reactive({
    isOpen: false,
    postId: null as string | null,
  })

  const state = reactive<Partial<Schema>>({
    title: undefined,
    content: undefined,
    image: undefined,
  })

  const schema = z.object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    content: z
      .string()
      .min(1, 'Content is required')
      .max(1000, 'Content must be less than 1000 characters'),
    image: z.string().optional(),
  })

  type Schema = z.output<typeof schema>

  const { data: posts, refresh } = await useFetch(
    `/api/teams/${currentTeam.value.id}/posts`,
    {
      watch: [currentTeam],
    },
  )

  async function uploadImage() {
    try {
      if (!selectedFile.value)
        return ''
      const formData = new FormData()
      formData.append('image', selectedFile.value)
      const filePath = await $fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })
      return `/images/${filePath}`
    }
    catch (error) {
      console.log(error)
      toast.add({
        title: 'Failed to upload image',
        description:
          error.data?.message || 'An error occurred while uploading the image',
        color: 'error',
      })
      throw createError('Failed to upload image')
    }
  }

  async function createPost(post: Partial<InsertPost>) {
    try {
      const { data, error } = await useFetch(
        `/api/teams/${currentTeam.value.id}/posts`,
        {
          method: 'POST',
          body: post,
        },
      )

      if (error.value) {
        throw error.value
      }

      return data.value
    }
    catch (error) {
      toast.add({
        title: 'Failed to create post',
        description:
          error.data?.message || 'An error occurred while creating the post',
        color: 'error',
      })
      throw error
    }
  }

  async function updatePost(id: string, post: Partial<Post>) {
    try {
      const updatedPost = await $fetch<Post>(
        `/api/teams/${currentTeam.value.id}/posts/${id}`,
        {
          method: 'PATCH',
          body: post,
        },
      )
      return updatedPost
    }
    catch (error) {
      toast.add({
        title: 'Failed to update post',
        description:
          error.data?.message || 'An error occurred while updating the post',
        color: 'error',
      })
      throw error
    }
  }

  async function deletePost(id: string) {
    try {
      deletingPostId.value = id
      return await $fetch<Post>(
        `/api/teams/${currentTeam.value.id}/posts/${id}`,
        {
          method: 'DELETE',
        },
      )
    }
    catch (error) {
      toast.add({
        title: 'Failed to delete post',
        description:
          error.data?.message || 'An error occurred while deleting the post',
        color: 'error',
      })
      throw error
    }
    finally {
      deletingPostId.value = null
    }
  }

  function resetForm() {
    state.title = undefined
    state.content = undefined
    state.image = undefined
    selectedFile.value = null
  }

  function openCreateModal() {
    resetForm()
    postModal.isEdit = false
    postModal.editId = null
    postModal.isOpen = true
  }

  function openEditModal(post: Omit<Post, 'createdAt' | 'updatedAt'>) {
    resetForm()
    state.title = post.title
    state.content = post.content
    state.image = post.image || undefined
    postModal.isEdit = true
    postModal.editId = post.id
    postModal.isOpen = true
  }

  function confirmDelete(postId: string) {
    deleteModal.postId = postId
    deleteModal.isOpen = true
  }

  function handleFileSelected(file: File | null) {
    selectedFile.value = file
    if (!file) {
      state.image = undefined
    }
  }

  async function handleSubmit(event: FormSubmitEvent<Schema>) {
    try {
      loading.value = true
      let image = state.image

      if (selectedFile.value) {
        image = await uploadImage()
      }

      const payload = {
        ...event.data,
        image,
      }

      if (postModal.isEdit && postModal.editId) {
        await updatePost(postModal.editId, payload)
        toast.add({
          title: 'Post updated',
          description: 'Your post has been updated successfully',
          color: 'success',
        })
      }
      else {
        await createPost(payload)
        toast.add({
          title: 'Post created',
          description: 'Your post has been created successfully',
          color: 'success',
        })
      }
      await refresh()
      postModal.isOpen = false
      resetForm()
    }
    catch (error) {
      console.error('Error submitting post:', error)
    }
    finally {
      loading.value = false
    }
  }

  async function handleDeletePost() {
    if (!deleteModal.postId)
      return

    try {
      loading.value = true
      await deletePost(deleteModal.postId)
      if (posts.value) {
        posts.value = posts.value.filter(
          post => post.id !== deleteModal.postId,
        )
      }

      toast.add({
        title: 'Post deleted',
        description: 'Your post has been deleted successfully',
        color: 'success',
      })
      deleteModal.isOpen = false
      deleteModal.postId = null
    }
    catch (error) {
      console.error('Error deleting post:', error)
    }
    finally {
      loading.value = false
    }
  }
</script>

<template>
  <AppContainer title="Posts">
    <template #actions>
      <UButton label="New Post" @click="openCreateModal()" />
    </template>
    <div>
      <div
        class="w-full columns-1 gap-3 space-y-3 md:columns-2 lg:columns-3 xl:columns-5"
      >
        <div
          v-for="post in posts"
          :key="post.id"
          class="break-inside-avoid-column rounded-2xl bg-neutral-100 dark:bg-neutral-950"
        >
          <div class="rounded-xl bg-[#fbfaf9] p-1.5 dark:bg-neutral-950">
            <div
              class="card-shadow group rounded-md bg-white dark:bg-neutral-900"
            >
              <header
                class="flex min-w-0 items-center gap-2 border-b border-neutral-100 px-4 py-2 dark:border-white/10"
              >
                <p
                  class="flex-1 truncate text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {{ post.title }}
                </p>
                <div
                  class="flex opacity-10 transition-opacity group-hover:opacity-100"
                >
                  <UButton
                    icon="i-lucide-pencil"
                    color="neutral"
                    variant="ghost"
                    size="xs"
                    @click="openEditModal(post)"
                  />
                  <UButton
                    icon="i-lucide-trash"
                    color="error"
                    variant="ghost"
                    size="xs"
                    :loading="deletingPostId === post.id"
                    @click="confirmDelete(post.id)"
                  />
                </div>
              </header>
              <div class="px-4 py-6">
                <img
                  v-if="post.image"
                  :src="post.image"
                  class="mb-2 min-h-40 w-full rounded-md object-cover"
                  :alt="post.title"
                />
                <p
                  class="text-sm whitespace-pre-wrap text-neutral-500 dark:text-neutral-400"
                >
                  {{ post.content }}
                </p>
              </div>
              <footer
                class="flex min-w-0 items-center justify-between gap-2 border-t border-neutral-100 px-4 py-2 dark:border-white/10"
              >
                <div class="flex items-center gap-2">
                  <UAvatar
                    v-if="post.userId.avatarUrl"
                    :src="post.userId.avatarUrl"
                    size="xs"
                  />
                  <p class="text-xs font-medium text-neutral-500">
                    {{ post.userId.name }}
                  </p>
                </div>
                <p class="text-xs font-medium text-neutral-500">
                  {{ useDateFormat(post.createdAt, "MMM DD hh:mm A") }}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Post Modal (Create/Edit) -->
    <UModal
      v-model:open="postModal.isOpen"
      :title="postModal.isEdit ? 'Edit Post' : 'New Post'"
      :description="
        postModal.isEdit
          ? 'Update your post'
          : 'Create a new post to share with your team'
      "
    >
      <template #body>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="handleSubmit"
        >
          <UFormField label="Image" name="imagePath">
            <AppPostImageUploader
              v-model="state.image"
              @file-selected="handleFileSelected"
            />
          </UFormField>
          <UFormField label="Title" name="title">
            <UInput v-model="state.title" class="w-full" size="xl" />
          </UFormField>

          <UFormField label="Content" name="content">
            <UTextarea v-model="state.content" class="w-full" size="xl" />
          </UFormField>

          <UButton
            :label="postModal.isEdit ? 'Update' : 'Submit'"
            type="submit"
            :loading="loading"
          />
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model:open="deleteModal.isOpen" title="Delete Post">
      <template #body>
        <p class="mb-4">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </p>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="outline"
            @click="deleteModal.isOpen = false"
          />
          <UButton
            label="Delete"
            color="error"
            :loading="loading"
            @click="handleDeletePost"
          />
        </div>
      </template>
    </UModal>
  </AppContainer>
</template>

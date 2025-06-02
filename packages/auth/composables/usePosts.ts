import type { InsertPost, Post } from '@serp/db/types/database';
import { FetchError } from 'ofetch';
import { reactive, ref } from 'vue';
import { z } from 'zod';

export async function usePosts(): Promise<{
  posts: Ref<Post[]>;
  loading: Ref<boolean>;
  deletingPostId: Ref<string | null>;
  postModal: any;
  deleteModal: any;
  state: any;
  schema: typeof schema;
  openCreateModal: () => void;
  openEditModal: (post: Post) => void;
  confirmDelete: (postId: string) => void;
  handleFileSelected: (file: File | null) => void;
  handleSubmit: (event: any) => Promise<void>;
  handleDeletePost: () => Promise<void>;
  refresh: () => Promise<void>;
}> {
  const { currentTeam } = useTeam();
  const toast = useToast();
  const loading = ref(false);
  const deletingPostId = ref<string | null>(null);
  const selectedFile = ref<File | null>(null);

  const postModal = reactive({
    isOpen: false,
    isEdit: false,
    editId: null as string | null,
  });

  const deleteModal = reactive({
    isOpen: false,
    postId: null as string | null,
  });

  const state = reactive<Partial<Schema>>({
    title: undefined,
    content: undefined,
    image: undefined,
  });

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
  });

  type Schema = z.output<typeof schema>;

  const { data: posts, refresh } = await useFetch<Post[]>(
    () => `/api/teams/${currentTeam.value.id}/posts`,
    {
      watch: [currentTeam],
      default: () => [],
    },
  );

  const uploadImage = async (): Promise<string | null> => {
    try {
      if (!selectedFile.value)
        return '';
      const formData = new FormData();
      formData.append('image', selectedFile.value);
      const filePath = await $fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });
      return `/images/${filePath}`;
    }
    catch (error) {
      console.log(error);
      toast.add({
        title: 'Failed to upload image',
        description:
          (error instanceof FetchError ? error.data?.message : null)
          || 'An error occurred while uploading the image',
        color: 'error',
      });
      throw createError('Failed to upload image');
    }
  };

  const createPost = async (post: Partial<InsertPost>): Promise<void> => {
    try {
      const { data, error } = await useFetch<Post>(
        `/api/teams/${currentTeam.value.id}/posts`,
        {
          method: 'POST',
          body: post,
        },
      );

      if (error.value) {
        throw error.value;
      }

      return data.value;
    }
    catch (error) {
      toast.add({
        title: 'Failed to create post',
        description:
          (error instanceof FetchError ? error.data?.message : null)
          || 'An error occurred while creating the post',
        color: 'error',
      });
      throw error;
    }
  };

  const updatePost = async (id: string, post: Partial<Post>): Promise<void> => {
    try {
      const updatedPost = await $fetch<Post>(
        `/api/teams/${currentTeam.value.id}/posts/${id}`,
        {
          method: 'PATCH',
          body: post,
        },
      );
      return updatedPost;
    }
    catch (error) {
      toast.add({
        title: 'Failed to update post',
        description:
          (error instanceof FetchError ? error.data?.message : null)
          || 'An error occurred while updating the post',
        color: 'error',
      });
      throw error;
    }
  };

  const deletePost = async (id: string): Promise<void> => {
    try {
      deletingPostId.value = id;
      return await $fetch<Post>(
        `/api/teams/${currentTeam.value.id}/posts/${id}`,
        {
          method: 'DELETE',
        },
      );
    }
    catch (error) {
      toast.add({
        title: 'Failed to delete post',
        description:
          (error instanceof FetchError ? error.data?.message : null)
          || 'An error occurred while deleting the post',
        color: 'error',
      });
      throw error;
    }
    finally {
      deletingPostId.value = null;
    }
  };

  const resetForm = (): void => {
    state.title = undefined;
    state.content = undefined;
    state.image = undefined;
    selectedFile.value = null;
  };

  const openCreateModal = (): void => {
    resetForm();
    postModal.isEdit = false;
    postModal.editId = null;
    postModal.isOpen = true;
  };

  const openEditModal = (post: Post): void => {
    resetForm();
    state.title = post.title;
    state.content = post.content;
    state.image = post.image || undefined;
    postModal.isEdit = true;
    postModal.editId = post.id;
    postModal.isOpen = true;
  };

  const confirmDelete = (postId: string): void => {
    deleteModal.postId = postId;
    deleteModal.isOpen = true;
  };

  const handleFileSelected = (file: File | null): void => {
    selectedFile.value = file;
    if (!file) {
      state.image = undefined;
    }
  };

  const handleSubmit = async (event: any): Promise<void> => {
    try {
      loading.value = true;
      let image = state.image;

      if (selectedFile.value) {
        image = await uploadImage();
      }

      const payload = {
        ...event.data,
        image,
      };

      if (postModal.isEdit && postModal.editId) {
        await updatePost(postModal.editId, payload);
        toast.add({
          title: 'Post updated',
          description: 'Your post has been updated successfully',
          color: 'success',
        });
      }
      else {
        await createPost(payload);
        toast.add({
          title: 'Post created',
          description: 'Your post has been created successfully',
          color: 'success',
        });
      }
      await refresh();
      postModal.isOpen = false;
      resetForm();
    }
    catch (error) {
      console.error('Error submitting post:', error);
    }
    finally {
      loading.value = false;
    }
  };

  const handleDeletePost = async (): Promise<void> => {
    if (!deleteModal.postId)
      return;

    try {
      loading.value = true;
      await deletePost(deleteModal.postId);
      await refresh();
      toast.add({
        title: 'Post deleted',
        description: 'Your post has been deleted successfully',
        color: 'success',
      });
      deleteModal.isOpen = false;
      deleteModal.postId = null;
    }
    catch (error) {
      console.error('Error deleting post:', error);
    }
    finally {
      loading.value = false;
    }
  };

  return {
    posts,
    loading,
    deletingPostId,
    postModal,
    deleteModal,
    state,
    schema,
    openCreateModal,
    openEditModal,
    confirmDelete,
    handleFileSelected,
    handleSubmit,
    handleDeletePost,
    refresh,
  };
}

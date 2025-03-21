<template>
  <div class="comment-wrapper">
    <div class="wrapper" @mouseenter="showHideBar = true" @mouseleave="showHideBar = false">
      <div class="w-12 rounded-t-full">
        <LazyNuxtImg :src="comment.image" alt="Avatar" class="h-12 w-12 rounded-full p-1" />
      </div>
      <div v-if="hideMessage" class="comment-wrapper">
        <div class="name-wrapper">
          <div class="name text-primary">{{ comment.name }}</div>
          <span class="dot">•</span>
          <span class="time" :title="getTime">{{ getTimeDiff }}</span>
          <div v-show="showHideBar || wrapperSize < 1024" class="expand hover:text-primary"
            @click="hideMessage = false">
            <span title="Show Comment">+</span>
          </div>
        </div>
        <div class="hidden-message"><i>[ Message is hidden. ]</i></div>
      </div>
      <div v-else class="comment-wrapper">
        <div v-show="!beforeUpdate" class="name-wrapper">
          <div class="name text-primary">{{ comment.name }}</div>
          <span class="dot">•</span>
          <span class="time" :title="getTime">{{ getTimeDiff }}</span>
          <UBadge v-if="isDeleted" class="deleted" color="error">Deleted</UBadge>
          <UBadge v-else-if="isUpdated" class="updated">Updated</UBadge>
          <div v-show="showHideBar || wrapperSize < 1024" class="expand hover:text-primary" @click="hideMessage = true">
            <span title="Hide Comment">−</span>
          </div>
        </div>
        <div v-show="!beforeUpdate" ref="comment" class="comment bg-white text-black dark:bg-gray-800 dark:text-white">
          {{ filteredComment }}
        </div>
        <div v-show="beforeUpdate" class="comment-box text-black dark:text-white">
          <div class="user-name text-primary">{{ comment.name }}</div>
          <textarea ref="addUpdate" v-model="updateMessage" name="addUpdate"
            class="add-comment bg-white dark:bg-gray-800" placeholder="Update message" spellcheck="false"
            aria-label="Add Comment" @keyup="resize($event, true)"></textarea>
          <button aria-label="Update" :disabled="requestLoading" class="bg-primary hover:bg-primary-800"
            @click="update">
            <div v-if="requestLoading" class="request-loading"></div>
            <span v-else>Update</span>
          </button>
          <div class="remaining-letter" :class="{
            'bg-red-500': remainingUpdateLetter < 0,
            'bg-primary': remainingUpdateLetter >= 0
          }">
            <span>{{ remainingUpdateLetter }}</span>
          </div>
        </div>
        <div v-show="beforeUpdate" class="reply hover:text-primary">
          <div @click="beforeUpdate = false">Never mind</div>
        </div>
        <div v-show="!beforeUpdate" class="reply">
          <div class="hover:text-primary" @click="handleBeforeReply">
            {{ beforeReply ? 'Never mind' : 'Reply' }}
          </div>
          <template v-if="localState.replies.length !== 0">
            <span class="dot">•</span>
            <div class="hover:text-primary" @click="showReply">
              {{
                showReplies
                  ? 'Hide replies'
                  : `Show replies [${localState.replies.length}]`
              }}
            </div>
          </template>
          <template v-if="isAuthorOrAdmin">
            <span class="dot">•</span>
            <div class="hover:text-primary" @click="handleBeforeUpdate">
              Update
            </div>
            <span class="dot">•</span>
            <div class="delete">
              <div class="delete-text" @click="handleBeforeDelete">Delete</div>
              <div v-if="beforeDelete" class="delete-prompt">
                <label>Are you sure?</label>
                <button aria-label="Yes" class="yes-prompt" :disabled="requestDelete" @click="deleteComment">
                  Yes
                </button>
                <button aria-label="No" class="no-prompt" :disabled="requestDelete" @click="beforeDelete = false">
                  No
                </button>
              </div>
            </div>
          </template>
        </div>
        <div v-if="beforeReply">
          <div class="add-comment">
            <div class="w-12 rounded-t-full">
              <LazyNuxtImg :src="user?.image" alt="Avatar" class="h-12 w-12 rounded-full p-1" />
            </div>
            <div class="comment-box text-black dark:text-white">
              <div class="user-name text-primary">
                {{ user?.name || 'Unknown' }}
              </div>
              <textarea ref="addReply" v-model="replyMessage" name="addReply"
                class="add-comment bg-white dark:bg-gray-800" placeholder="Add new reply" spellcheck="false"
                aria-label="Add Reply" @keyup="resize($event)"></textarea>
              <button aria-label="Reply" :disabled="requestLoading" class="bg-primary hover:bg-primary-800"
                @click="reply">
                <div v-if="requestLoading" class="request-loading"></div>
                <span v-else>Reply</span>
              </button>
              <div class="remaining-letter" :class="{
                'bg-red-500': remainingLetter < 0,
                'bg-primary': remainingLetter >= 0
              }">
                <span>{{ remainingLetter }}</span>
              </div>
            </div>
          </div>
        </div>
        <transition-group appear name="fade" tag="div">
          <CommentWrapper v-for="(reply, index) in displayedReplies" v-show="showReplies" :id="id" :key="reply.id"
            :comment="reply" :comment-background-color="commentBackgroundColor" :comment-text-color="commentTextColor"
            :user-name-color="userNameColor" :wrapper-size="wrapperSize" :depth-length="depthLength + 1"
            :module="props.module" :parent-ids="[...parentIds, comment.id]"
            :parent-indices="[...parentIndices, currentIndex]" :current-index="getIndex(reply.id)"
            @delete-row="deleteReply(index)" @update-comment="$emit('update-comment', $event)"
            @add-reply="$emit('add-reply', $event)" @delete-reply="$emit('delete-reply', $event)" />
        </transition-group>
        <div v-if="limit < localState.replies.length && showReplies" class="update-limit" @click="updateLimit">
          <span class="limit">Show more replies</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { loggedIn, user } = useUserSession()

const props = defineProps({
  module: String,
  id: Number,
  comment: Object,
  currentIndex: Number,
  initialMessageLimit: { type: String, default: '10' },
  maxLineLimit: { type: String, default: '40' },
  maxShowingDepth: { type: String, default: '5' },
  maxCommentLength: { type: String, default: '1000' },
  depthLength: { type: Number, default: 0 },
  commentBackgroundColor: { type: String, default: 'white' },
  commentTextColor: { type: String, default: '#1d2129' },
  userNameColor: { type: String, default: 'rgb(6, 177, 183)' },
  wrapperSize: String,
  parentIds: { type: Array, default: () => [] },
  parentIndices: { type: Array, default: () => [] }
});

const localComment = computed(() => ({
  content: filteredComment.value,
  updatedAt: props.comment.updatedAt,
  replies: [...props.comment.replies],
  replyCount: props.comment.replyCount || 0
}));

const localState = reactive({
  updatedAt: null,
  replies: [],
  replyCount: 0
});

watch(
  () => props.comment,
  (newComment) => {
    localState.replies = [...newComment.replies];
    localState.replyCount = newComment.replyCount || 0;
    localState.updatedAt = newComment.updatedAt;
  },
  { immediate: true }
);

const getIndex = (id) =>
  localState.replies.findIndex((comment) => comment.id === id);

const emit = defineEmits([
  'delete-row',
  'update-comment',
  'add-reply',
  'delete-reply'
]);

const toast = useToast();

const showHideBar = ref(false);
const hideMessage = ref(false);
const beforeReply = ref(false);
const beforeUpdate = ref(false);
const beforeDelete = ref(false);
const showReplies = computed(
  () => props.depthLength < parseInt(props.maxShowingDepth)
);
const filteredComment = ref('');
const updateMessage = ref('');
const replyMessage = ref('');
const updateHeight = ref(0);
const limit = computed(() => parseInt(props.initialMessageLimit));
const requestLoading = ref(false);
const requestDelete = ref(false);

const isAuthorOrAdmin = computed(
  () =>
    loggedIn.value &&
    (user?.value?.email === props.comment.email ||
      user?.value?.isAdmin)
);

const displayedReplies = computed(() =>
  localState.replies.slice(0, limit.value)
);

const remainingUpdateLetter = computed(
  () => parseInt(props.maxCommentLength) - updateMessage.value.length
);

const remainingLetter = computed(
  () => parseInt(props.maxCommentLength) - replyMessage.value.length
);

const isDeleted = computed(() => filteredComment.value === '[deleted]');
const isUpdated = computed(
  () => localState.updatedAt !== props.comment.createdAt
);

const getTimeDiff = computed(() => {
  const now = Date.now();
  const commentTime = parseInt(localState.updatedAt);
  const diff = now - commentTime;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return years === 1 ? 'a year ago' : `${years} years ago`;
  if (months > 0) return months === 1 ? 'a month ago' : `${months} months ago`;
  if (days > 0) return days === 1 ? 'a day ago' : `${days} days ago`;
  if (hours > 0) return hours === 1 ? 'an hour ago' : `${hours} hours ago`;
  if (minutes > 0)
    return minutes === 1 ? 'a minute ago' : `${minutes} minutes ago`;
  return 'just now';
});

const getTime = computed(() => {
  const date = new Date(parseInt(props.comment.timestamp));
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
});

function handleBeforeReply() {
  beforeReply.value = !beforeReply.value;
  if (beforeReply.value) {
    nextTick(() => {
      const replyTextarea = document.querySelector('[ref="addReply"]');
      if (replyTextarea) replyTextarea.focus();
    });
  }
}

function handleBeforeUpdate() {
  beforeUpdate.value = true;
  updateMessage.value = filteredComment.value;
  nextTick(() => {
    const updateTextarea = document.querySelector('[ref="addUpdate"]');
    if (updateTextarea) {
      updateTextarea.focus();
      resize({ target: updateTextarea }, true);
    }
  });
}

function showReply() {
  showReplies.value = !showReplies.value;
}

function handleBeforeDelete() {
  beforeDelete.value = !beforeDelete.value;
  if (beforeDelete.value) {
    setTimeout(() => {
      beforeDelete.value = false;
    }, 5000);
  }
}

async function update() {
  if (!loggedIn.value) {
    toast.add({
      id: 'update-comment-login',
      title: 'Login required',
      description: 'You need to login to update your comment',
      icon: 'exclamation-circle'
    });
    return;
  }

  if (
    user?.value?.email !== props.comment.email &&
    !user?.value?.isAdmin
  ) {
    toast.add({
      id: 'update-comment-author',
      title: 'Permission denied',
      description: 'You do not have permission to update this comment',
      icon: 'exclamation-circle'
    });
    return;
  }

  requestLoading.value = true;
  try {
    if (updateMessage.value.trim().length === 0) {
      toast.add({
        id: 'update-comment-empty',
        title: 'Empty comment',
        description: 'You cannot send an empty comment',
        icon: 'exclamation-circle'
      });
      return;
    }
    const updatedAt = Date.now();
    const { data: response, error } = await useFetch(
      `/api/comments/${props.id}`,
      {
        method: 'PUT',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify({
          commentId: props.comment.id,
          commentIndex: props.currentIndex,
          parentIds: props.parentIds,
          parentIndices: props.parentIndices,
          comment: updateMessage.value,
          timestamp: updatedAt.toString(),
          module: props.module
        })
      }
    );
    if (error.value) {
      throw new Error(`Failed to update comment - ${error.value.message}`);
    }

    if (response.value.message && response.value.message === 'success') {
      filteredComment.value = updateMessage.value;
      localState.updatedAt = updatedAt;
      beforeUpdate.value = false;

      emit('update-comment', {
        id: props.comment.id,
        updatedAt,
        content: updateMessage.value
      });

      toast.add({
        id: 'update-comment-success',
        title: 'Comment updated',
        description: 'Your comment has been updated successfully',
        icon: 'check-circle'
      });
    } else {
      throw new Error(`Failed to update comment - ${response.value.message}`);
    }
  } catch (error) {
    toast.add({
      id: 'update-comment-error',
      title: 'Error updating comment',
      description: error.message,
      icon: 'exclamation-circle'
    });
  } finally {
    requestLoading.value = false;
  }
}

async function deleteComment() {
  if (!loggedIn.value) {
    toast.add({
      id: 'delete-comment-login',
      title: 'Login required',
      description: 'You need to login to delete your comment',
      icon: 'exclamation-circle'
    });
    return;
  }

  if (
    user?.value?.email !== props.comment.email &&
    !user?.value?.isAdmin
  ) {
    toast.add({
      id: 'delete-comment-author',
      title: 'Permission denied',
      description: 'You do not have permission to delete this comment',
      icon: 'exclamation-circle'
    });
    return;
  }

  requestDelete.value = true;
  try {
    const { data: response, error } = await useFetch(
      `/api/comments/${props.id}`,
      {
        method: 'PUT',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify({
          commentId: props.comment.id,
          commentIndex: props.currentIndex,
          parentIds: props.parentIds,
          parentIndices: props.parentIndices,
          comment: '[deleted]',
          timestamp: Date.now().toString(),
          module: props.module
        })
      }
    );
    if (error.value) {
      throw new Error('Failed to delete comment: ' + error.message);
    }

    if (response.value.message && response.value.message === 'success') {
      // emit('delete-row')
      filteredComment.value = '[deleted]';
      toast.add({
        id: 'delete-comment-success',
        title: 'Comment deleted',
        description: 'Your comment has been deleted successfully',
        icon: 'check-circle'
      });
    } else {
      throw new Error('Failed to delete comment: ' + response.value.message);
    }
  } catch (error) {
    toast.add({
      id: 'delete-comment-error',
      title: 'Error deleting comment',
      description: error.message,
      icon: 'exclamation-circle'
    });
  } finally {
    requestDelete.value = false;
    beforeDelete.value = false;
  }
}

function deleteReply(index) {
  localState.replies.splice(index, 1);

  emit('delete-reply', {
    commentId: props.comment.id,
    replyIndex: index
  });
}

function updateLimit() {
  limit.value += parseInt(props.initialMessageLimit);
}

function resize(event, isUpdate = false) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight}px`;
  if (isUpdate) {
    updateHeight.value = textarea.scrollHeight;
  }
}

async function reply() {
  if (!loggedIn.value || !user?.value?.email) {
    toast.add({
      id: 'reply-comment-login',
      title: 'Login required',
      description: 'You need to login to reply to a comment',
      icon: 'exclamation-circle'
    });
    return;
  }

  if (replyMessage.value.trim().length === 0) {
    toast.add({
      id: 'reply-comment-empty',
      title: 'Empty reply',
      description: 'You cannot send an empty reply',
      icon: 'exclamation-circle'
    });
    return;
  }

  requestLoading.value = true;
  try {
    const replyObj = {
      comment: replyMessage.value,
      timestamp: Date.now().toString(),
      parentIds: [...props.parentIds, props.comment.id],
      parentIndices: [...props.parentIndices, props.currentIndex],
      module: props.module
    };

    const { data: response, error } = await useFetch(
      `/api/comments/${props.id}`,
      {
        method: 'POST',
        headers: useRequestHeaders(['cookie']),
        body: JSON.stringify(replyObj)
      }
    );

    if (error.value) {
      throw new Error('Failed to add reply: ' + error.value.message);
    }

    if (response.value.message && response.value.message === 'success') {
      const newReply = {
        id: response.value.id,
        email: user.value.email,
        name: user.value.name,
        image: user.value.image,
        content: replyMessage.value,
        createdAt: replyObj.timestamp,
        updatedAt: replyObj.timestamp,
        replies: []
      };

      localState.replies.push(newReply);
      localState.replyCount++;

      emit('add-reply', {
        commentId: props.comment.id,
        reply: newReply
      });

      replyMessage.value = '';
      beforeReply.value = false;
      if (!showReplies.value) {
        showReplies.value = true;
      }
      toast.add({
        id: 'reply-comment-success',
        title: 'Reply added',
        description: 'Your reply has been added successfully',
        icon: 'check-circle'
      });
    } else {
      throw new Error('Failed to add reply: ' + response.value.message);
    }
  } catch (error) {
    toast.add({
      id: 'reply-comment-error',
      title: 'Error adding reply',
      description: error.message,
      icon: 'exclamation-circle'
    });
  } finally {
    requestLoading.value = false;
  }
}

onMounted(() => {
  filteredComment.value = props.comment.content;
  if (props.comment.lineCount > parseInt(props.maxLineLimit)) {
    const lines = props.comment.content.split('\n');
    filteredComment.value =
      lines.slice(0, parseInt(props.maxLineLimit)).join('\n') +
      (lines.length > parseInt(props.maxLineLimit) ? '...' : '');
  }

  const commentElement = document.querySelector('[ref="comment"]');
  if (commentElement) {
    updateHeight.value = commentElement.clientHeight + 13;
  }
});
</script>

<style scoped>
.comment-wrapper {
  font-family: 'Roboto', sans-serif;
  overflow: hidden;
  border-radius: 4px;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.wrapper {
  display: grid;
  grid-template-columns: 0.001fr 1fr;
  grid-auto-rows: minmax(0, auto);
  grid-column-gap: 10px;
  padding-top: 15px;
}

.comment-wrapper {
  display: grid;
  grid-auto-rows: minmax(0, auto);
  grid-auto-columns: minmax(min-content, max-content);
  grid-gap: 10px;
}

.hidden-message {
  color: #ffc107;
  word-break: break-word;
  font-size: 13px;
}

.name-wrapper {
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-auto-columns: minmax(0, auto);
  grid-column-gap: 5px;
  line-height: 13px;
  white-space: nowrap;
  user-select: none;
  margin-bottom: 4px;
  align-items: center;
}

.name {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  white-space: nowrap;
}

.time {
  cursor: help;
  font-size: 12px;
  color: #787c7e;
  white-space: nowrap;
  text-decoration: none;
}

.expand {
  cursor: pointer;
  display: grid;
  width: 22px;
  height: 13px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 2px rgba(204, 212, 216, 1);
  transition: color linear 0.1s;
}

.expand>span {
  align-self: center;
  justify-self: center;
  font-size: 20px;
}

.comment {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  font-size: 14px;
  line-height: 21px;
  font-kerning: normal;
  padding: 0;
  margin-bottom: 8px;
  border: none;
  background: transparent;
  min-width: min-content;
  max-width: max-content;
}

.reply {
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-auto-columns: minmax(0, auto);
  grid-auto-rows: minmax(0, auto);
  grid-column-gap: 8px;
  font-size: 12px;
  white-space: nowrap;
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 12px;
  transition: color linear 0.1s;
  user-select: none;
}

.reply>div {
  cursor: pointer;
}

.delete {
  display: grid;
  box-sizing: border-box;
  height: min-content;
}

.delete:hover {
  color: #ff5252;
}

.delete-prompt {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(0, auto);
  grid-gap: 3px;
  color: #ff5252;
  box-sizing: border-box;
  background-color: #fff;
  padding: 3px 13px;
  border-radius: 4px;
  height: max-content;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border: 1px solid rgba(204, 212, 216, 0.8);
  margin-top: -60px;
  margin-left: -24px;
  z-index: 999;
}

.delete-prompt>label {
  grid-column: 1/3;
  grid-row: 2;
  font-weight: 700;
  margin-left: -7px;
}

.delete-prompt>button {
  grid-row: 1;
  font-size: 11px;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-size: 12px;
  line-height: 15px;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: linear 0.1s all;
}

.yes-prompt {
  border: 1px solid rgba(42, 94, 190, 0.9);
  background-color: rgba(42, 94, 190, 0.9);
  color: #fff;
}

.yes-prompt:hover {
  border: 1px solid #ff5252;
  background-color: #ff5252;
  color: #fff;
}

.no-prompt {
  border: 1px solid rgba(42, 94, 190, 0.9);
  background-color: #fff;
  color: rgba(42, 94, 190, 0.9);
}

.no-prompt:hover {
  border: 1px solid rgba(42, 94, 190, 0.9);
  background-color: rgba(42, 94, 190, 0.9);
  color: #fff;
}

.add-comment {
  display: grid;
  grid-template-columns: 0.001fr 1fr;
  grid-auto-rows: minmax(0, auto);
  grid-column-gap: 10px;
  padding-top: 2px;
}

.comment-box {
  display: grid;
  grid-template-columns: minmax(200px, auto) 1fr;
  grid-auto-rows: minmax(0, max-content);
  grid-row-gap: 10px;
  overflow: auto;
}

.comment-box>textarea {
  font-family: 'Roboto', sans-serif;
  justify-self: stretch;
  box-sizing: border-box;
  height: 32px;
  padding: 8px 10px 8px 10px;
  font-size: 13px;
  line-height: 16px;
  border-radius: 18px;
  border: 1px solid rgba(204, 212, 216, 0.8);
  overflow: hidden;
  resize: none;
  outline: none;
  transition: linear 0.1s all;
}

.comment-box>button {
  font-family: 'Roboto', sans-serif;
  align-self: end;
  max-height: 32px;
  box-sizing: border-box;
  height: 32px;
  padding: 8px 10px;
  font-size: 13px;
  line-height: 16px;
  font-weight: 700;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: linear 0.1s all;
  z-index: 100;
}

.remaining-letter {
  justify-self: end;
  align-self: start;
  box-sizing: border-box;
  height: 32px;
  display: grid;
  border-top-left-radius: 18px;
  padding-left: 3px;
  padding-right: 22px;
  margin-top: -42px;
  margin-right: -22px;
  z-index: 99;
}

.remaining-letter>span {
  align-self: center;
  font-size: 11px;
  line-height: 11px;
  padding: 3px;
  color: #eee;
}

.update-limit {
  display: grid;
  grid-template-columns: 1fr;
}

.limit {
  color: rgb(6, 177, 183);
  font-weight: 700;
  justify-self: center;
  font-size: 14px;
  line-height: 14px;
  box-sizing: border-box;
  border-radius: 18px;
  padding: 8px 10px;
  cursor: pointer;
  transition: linear 0.1s all;
}

.limit:hover {
  color: #fff;
  background-color: #2196f3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.request-loading {
  display: inline-block;
  border: 4px solid transparent;
  border-left-color: #fff;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: request-loading-spin 0.5s linear infinite;
}

@keyframes request-loading-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.alert {
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
  border-top-left-radius: 40px;
  border-bottom-right-radius: 40px;
  border-width: 3px 0 3px;
  border-style: solid;
  color: #fff;
  font-size: 13px;
  padding: 15px 15px 15px 15px;
  white-space: pre-line;
  text-align: center;
}

.alert.success {
  background-color: #4caf50;
}

.alert.fail {
  background-color: #ff5252;
}

@media only screen and (max-width: 480px) {
  .avatar>svg {
    height: 20px;
    width: 20px;
  }

  .name-wrapper>.time {
    overflow: hidden;
    width: 38px;
    text-overflow: ellipsis;
  }
}

@media (hover: none) {
  ::-webkit-scrollbar {
    -webkit-appearance: none !important;
    width: 5px !important;
    height: 5px !important;
    background-color: rgba(204, 212, 216, 0.2) !important;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(204, 212, 216, 0.7) !important;
  }

  .comment-box {
    overflow: unset;
  }
}
</style>

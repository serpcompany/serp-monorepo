<template>
  <div ref="wrapper" class="comments" :style="{ background }">
    <div v-if="loading" class="loader">
      <svg id="loader" width="150" height="150">
        <circle fill="red">
          <animate
                   attributeName="cx"
                   values="15;135;15"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="r"
                   values="15;7.5;2;7.5;15"
                   keyTimes="0;0.25;0.5;0.75;1"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="cy"
                   values="135;15;135"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="6s"
                   repeatCount="indefinite" />
        </circle>
        <circle fill="green">
          <animate
                   attributeName="cx"
                   values="135;15;135"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="r"
                   values="15;7.5;2;7.5;15"
                   keyTimes="0;0.25;0.5;0.75;1"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="cy"
                   values="15;135;15"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="6s"
                   repeatCount="indefinite" />
        </circle>
        <circle fill="blue">
          <animate
                   attributeName="cx"
                   values="15;135;15"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="r"
                   values="15;7.5;2;7.5;15"
                   keyTimes="0;0.25;0.5;0.75;1"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="cy"
                   values="15;135;15"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="6s"
                   repeatCount="indefinite" />
        </circle>
        <circle fill="orange">
          <animate
                   attributeName="cx"
                   values="135;15;135"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="r"
                   values="15;7.5;2;7.5;15"
                   keyTimes="0;0.25;0.5;0.75;1"
                   dur="3s"
                   repeatCount="indefinite" />
          <animate
                   attributeName="cy"
                   values="135;15;135"
                   keyTimes="0;0.5;1"
                   calcMode="spline"
                   keySplines="0.74 0.11 0.3 0.85; 0.74 0.11 0.3 0.85;"
                   dur="6s"
                   repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
    <div v-else class="innerWrapper">
      <div v-if="status == 'authenticated'" class="userName">
        <div class="addComment">
          <div class="w-12 rounded-t-full">
            <LazyNuxtImg
                         :src="data.user.image"
                         alt="Avatar"
                         class="h-12 w-12 rounded-full p-1" />
          </div>
          <div class="commentBox text-black dark:text-white">
            <textarea
                      v-model="newComment"
                      name="addComment"
                      class="addComment bg-white dark:bg-gray-800 border-gray-500 dark:border-gray-400"
                      placeholder="Add a comment"
                      spellcheck="true"
                      aria-label="Add comment"
                      @keyup="resize"
                      @focus="expandTextarea"
                      @blur="handleBlur"></textarea>
            <div v-if="isExpanded" class="action-buttons mt-2 flex justify-end gap-2">
              <button
                      class="cancel-btn px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      @click="cancelComment">
                Cancel
              </button>
              <button
                      class="comment-btn px-4 py-2 rounded-full bg-primary text-white hover:bg-primary-800"
                      :disabled="!filterNewComment.length || requestLoading"
                      @click="addComment">
                <div v-if="requestLoading" class="request-loading"></div>
                <span v-else>Comment</span>
              </button>
            </div>
            <div v-if="alert" class="alert" :class="alertClass">
              {{ alertMessage }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noCommentWrapper">
        <NuxtLink
                  :to="`/login?redirectTo=${$route.fullPath}`"
                  class="noCommentWrapper">
          <span
                class="noCommentText text-primary border-primary hover:bg-primary border hover:text-white">Sign in to comment.</span>
        </NuxtLink>
      </div>
      <TransitionGroup appear name="fade" tag="div">
        <CommentWrapper
                        v-for="(item, index) in displayedComments"
                        :id="props.id"
                        :key="item.id"
                        :comment="item"
                        :comment-background-color="commentBackgroundColor"
                        :comment-text-color="commentTextColor"
                        :user-name-color="userNameColor"
                        :wrapper-size="wrapperSize.toString()"
                        :module="props.module"
                        :current-index="getIndex(item.id)"
                        @delete-comment="deleteComment(index)" />
      </TransitionGroup>
      <div
           v-if="limit < comments.length"
           class="updateLimit"
           @click="updateLimit">
        <span class="limit">Show more comments</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  module: { type: String,required: true },
  id: { type: Number,required: true },
  maxCommentLength: { type: String,default: '1000' },
  initialMessageLimit: { type: String,default: '10' },
  background: { type: String,default: 'transparent' },
  commentBackgroundColor: { type: String,default: 'white' },
  commentTextColor: { type: String,default: '#1d2129' },
  userNameColor: { type: String,default: 'rgb(6, 177, 183)' },
  comments: { type: Array,default: () => [] }
});

const emit = defineEmits(['loading-finished']);

const toast = useToast();

const { status,data } = useAuth();

const loading = ref(true);
const comments = toRef(props,'comments');
const newComment = ref('');
const limit = computed(() => parseInt(props.initialMessageLimit));
const alertMessage = ref('');
const alertClass = ref('');
const alert = ref(false);
const wrapperSize = ref('');
const requestLoading = ref(false);
const isExpanded = ref(false);

const styleShadow = computed(() => ({
  // Remove the box-shadow
}));

const displayedComments = computed(() => comments.value.slice(0,limit.value));

const remainingLetter = computed(
  () => parseInt(props.maxCommentLength) - newComment.value.length
);

const filterNewComment = computed(() => {
  return newComment.value
    .replace(/^\n+/,'')
    .replace(/(\n{2,})+/g,'\n\n')
    .replace(/\n+$/,'')
    .replace(/( {30,})+/g,' ')
    .replace(/ +$/,'');
});

function updateLimit() {
  limit.value += parseInt(props.initialMessageLimit);
}

function resize(event) {
  const textarea = event.target;
  if (newComment.value === '') {
    textarea.style.height = '32px';
  } else {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}

function expandTextarea(event) {
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.max(textarea.scrollHeight,60)}px`;
  isExpanded.value = true;
}

function handleBlur(event) {
  setTimeout(() => {
    if (document.activeElement.closest('.action-buttons')) {
      return;
    }

    if (!isExpanded.value) {
      const textarea = event.target;
      if (newComment.value === '') {
        textarea.style.height = '32px';
      }
    }
  },100);
}

function cancelComment() {
  isExpanded.value = false;
  newComment.value = '';
  const textarea = document.querySelector('textarea.addComment');
  if (textarea) {
    textarea.style.height = '32px';
    textarea.blur();
  }
}

const getIndex = (id) =>
  props.comments.findIndex((comment) => comment.id === id);

async function addComment() {
  if (!data?.value?.user?.email) {
    toast.add({
      id: 'comment-login',
      title: 'Login required',
      description: 'You need to login to comment',
      icon: 'exclamation-circle'
    });
    return;
  }
  if (filterNewComment.value.length > 0) {
    requestLoading.value = true;
    const commentObj = {
      comment: filterNewComment.value,
      timestamp: Date.now().toString(),
      module: props.module
    };

    try {
      const { data: response,error } = await useFetch(
        `/api/comments/${props.id}`,
        {
          method: 'POST',
          headers: useRequestHeaders(['cookie']),
          body: JSON.stringify(commentObj)
        }
      );

      if (error.value) {
        throw new Error(`Failed to add comment - ${error.value.message}`);
      }

      if (response.value.message && response.value.message === 'success') {
        toast.add({
          id: 'comment-success',
          title: 'Comment added',
          description: 'Your comment has been added successfully',
          icon: 'check-circle'
        });
        comments.value.push({
          id: response.value.id,
          email: data.value.user.email,
          name: data.value.user.name,
          image: data.value.user.image,
          content: commentObj.comment,
          createdAt: commentObj.timestamp,
          updatedAt: commentObj.timestamp,
          replies: []
        });
        newComment.value = '';
        resize({ target: document.querySelector('textarea.addComment') });
        isExpanded.value = false;
      } else {
        throw new Error(`Failed to add comment - ${response.value.message}`);
      }
    } catch (error) {
      toast.add({
        id: 'comment-error',
        title: 'Error adding comment',
        description: error.message,
        icon: 'exclamation-circle'
      });
    } finally {
      requestLoading.value = false;
    }
  } else {
    setAlert("You can't send an empty comment!",'fail');
  }
}

function deleteComment(index) {
  comments.value.splice(index,1);
}

function focusCommentBox() {
  document.querySelector('textarea.addComment')?.focus();
}

onMounted(async () => {
  if (document.querySelector('[ref="wrapper"]')) {
    wrapperSize.value = document.querySelector('[ref="wrapper"]').offsetWidth;
  }

  loading.value = false;
  emit('loading-finished');
});
</script>

<style scoped>
.loader {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(150px, auto);
  padding: 5px;
}

#loader {
  justify-self: center;
  align-self: center;
}

.comments>>>.alert {
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
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  white-space: pre-line;
  text-align: center;
}

.comments>>>.alert.alert {
  border-color: rgba(0, 0, 0, 0.12) !important;
}

.comments>>>.success {
  background-color: #4caf50 !important;
}

.comments>>>.pass {
  border-color: #4caf50 !important;
}

.comments>>>.info {
  background-color: #2196f3 !important;
}

.comments>>>.default {
  border-color: #2196f3 !important;
}

.comments>>>.alert.fail {
  background-color: #ff5252 !important;
}

.comments>>>.fail {
  border-color: #ff5252 !important;
}

.comments>>> ::-webkit-input-placeholder {
  color: #4b5563 !important;
  text-align: left;
    font-weight: normal;
  }

        .comments>>> ::-moz-placeholder {
          color: #4b5563 !important;
          text-align: left;
          font-weight: normal;
        }
    
        .comments>>> :-ms-input-placeholder {
          color: #4b5563 !important;
          text-align: left;
          font-weight: normal;
        }
    
        .comments>>> :-moz-placeholder {
          color: #4b5563 !important;
          text-align: left;
          font-weight: normal;
        }
    
        .comments {
          font-family: 'Roboto', sans-serif;
          overflow: hidden;
          border-radius: 0;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-text-size-adjust: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          border: none;
          background-color: transparent;
          box-shadow: none;
        }
    
        .comments>>>.comments {
          overflow-x: auto;
          background-color: transparent;
        }
    
        .comments>.innerWrapper {
          overflow-x: auto;
          padding: 10px 0;
          background-color: transparent;
          border: none;
        }
    
        .comments>>>.noCommentWrapper {
          display: grid;
          padding-top: 15px;
        }
    
        .comments>>>.noCommentText {
          cursor: pointer;
          text-align: center;
          padding: 8px 10px;
          font-weight: 700;
          border-radius: 18px;
          border-top-right-radius: 0;
          border-bottom-left-radius: 0px;
          transition: linear 0.1s all;
          -moz-transition: linear 0.1s all;
          -webkit-transition: linear 0.1s all;
        }
    
        .comments>>>.userName {
          grid-column: 1/3;
          display: grid;
          grid-template-columns: 1fr 0.001fr;
          font-size: 14px;
          line-height: 14px;
          margin-top: 2px;
          font-weight: 700;
          color: rgb(6, 177, 183);
          word-break: break-word;
        }
    
        .comments>>>.userName>.logOut {
          grid-column: 2;
          white-space: nowrap;
          color: #92b1b3;
          cursor: pointer;
          margin-right: 10px;
          transition: color linear 0.1s;
          -moz-transition: color linear 0.1s;
          -webkit-transition: color linear 0.1s;
        }
    
        .comments>>>.userName>.logOut:hover {
          color: rgb(6, 177, 183);
        }
    
        .comments>>>.dot {
          color: #c2c6cc;
          font-size: 13px;
          white-space: nowrap;
        }
    
        .comments>>>.avatar {
          border-top-left-radius: 22px;
          border-top-right-radius: 22px;
        }
    
        .comments>>>.avatar>svg {
          border-radius: 50%;
          height: 44px;
          width: 44px;
          transition: 0.3s;
          -moz-transition: 0.3s;
          -webkit-transition: 0.3s;
        }
    
        .comments>>>.addComment {
          display: grid;
          grid-template-columns: 0.001fr 1fr;
          grid-auto-rows: minmax(0, auto);
          grid-column-gap: 10px;
          padding-top: 2px;
          background-color: transparent;
          border: none;
          box-shadow: none;
        }
    
        .comments>>>.commentBox {
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: minmax(0, -webkit-max-content);
          grid-auto-rows: minmax(0, max-content);
          grid-auto-rows: minmax(0, -moz-max-content);
          grid-row-gap: 10px;
          overflow: auto;
          background-color: transparent;
          border: none;
          box-shadow: none;
        }
    
        .comments>>>.commentBox>textarea {
          font-family: 'Roboto', sans-serif;
          justify-self: stretch;
          box-sizing: border-box;
          height: 44px;
          min-height: 44px;
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 16px;
          padding-right: 16px;
          font-size: 14px;
          line-height: 20px;
          border-radius: 24px;
          border: 1px solid #6b7280;
          overflow: hidden;
          resize: none;
          outline: none;
          transition: linear 0.1s all;
          -moz-transition: linear 0.1s all;
          -webkit-transition: linear 0.1s all;
          width: 100%;
        }
    
        .comments>>>.commentBox>button {
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
          -moz-transition: linear 0.1s all;
          -webkit-transition: linear 0.1s all;
          z-index: 100;
        }
    
        .comments>>>.remainingLetter {
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
    
        .comments>>>.remainingLetter>span {
          align-self: center;
          font-size: 11px;
          line-height: 11px;
          padding: 3px;
          color: #eee;
        }
    
        .comments>>>.updateLimit {
          display: grid;
          grid-template-columns: 1fr;
        }
    
        .comments>>>.limit {
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
          -moz-transition: linear 0.1s all;
          -webkit-transition: linear 0.1s all;
        }
    
        .comments>>>.limit:hover {
          color: #fff;
          background-color: #2196f3;
        }
    
        .comments>>>.fade-enter {
          opacity: 0;
        }
    
        .comments>>>.fade-enter-active {
          transition: opacity 0.3s;
          -moz-transition: opacity 0.3s;
          -webkit-transition: opacity 0.3s;
        }
    
        .comments>>>.fade-leave-active {
          transition: opacity 0.3s;
          -moz-transition: opacity 0.3s;
          -webkit-transition: opacity 0.3s;
          opacity: 0;
        }
    
        @media only screen and (max-width: 480px) {
          .comments>>>.avatar>svg {
            height: 20px;
            width: 20px;
          }
    
          .comments>>>.nameWrapper>.time {
            overflow: hidden;
            width: 38px;
            text-overflow: ellipsis;
          }
        }
    
        @media (hover: none) {
          .comments>>> ::-webkit-scrollbar {
            -webkit-appearance: none !important;
          }
    
          .comments>>> ::-webkit-scrollbar {
            width: 5px !important;
            height: 5px !important;
            background-color: rgba(204, 212, 216, 0.2) !important;
          }
    
          .comments>>> ::-webkit-scrollbar-thumb {
            background: rgba(204, 212, 216, 0.7) !important;
          }
    
          .comments>>>.commentBox {
            overflow: unset;
          }
        }
    
        .comments>>>.requestLoading {
          display: inline-block;
          border: 4px solid transparent;
          border-left-color: #fff;
          border-radius: 50%;
          width: 10px;
          height: 10px;
          animation: requestLoading-spin 0.5s linear infinite;
        }
    
        @keyframes requestLoading-spin {
          0% {
            transform: rotate(0deg);
          }
    
          100% {
            transform: rotate(360deg);
          }
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
</style>

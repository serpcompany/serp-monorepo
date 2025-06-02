<script setup lang="ts">
interface Props {
  id: number | string
}

const props = defineProps<Props>()

const { loggedIn } = useUserSession()
const toast = useToast()

async function handleEdit() {
  if (loggedIn.value) {
    return await navigateTo(`/users/manage/company/${props.id}`)
  }

  toast.add({
    id: 'need-logged-in',
    title: 'Need to be logged in',
    description: 'You need to be logged in to edit',
    icon: 'lucide:info',
  })
}
</script>

<template>
  <div class="flex w-full items-center sm:w-auto">
    <UButton
      variant="outline"
      color="neutral"
      icon="lucide:pencil-line"
      @click="handleEdit"
    />
  </div>
</template>

<script setup lang="ts">
  import { CompanyVerificationModal } from '#components'
  import { useOverlay } from '#imports'

  interface Props {
    id: number | string
    domain: string
    verified: boolean
  }

  const props = defineProps<Props>()
  const overlay = useOverlay()
  const { id, domain } = toRefs(props)

  const modal = overlay.create(CompanyVerificationModal, {
    props: {
      id: id.value,
      domain: domain.value,
    },
  })

  async function handleClaim() {
    // Open modal programatically
    modal.open()
  }
</script>

<template>
  <div class="flex items-center">
    <template v-if="verified">
      <UTooltip
        :content="{
          align: 'center',
          side: 'top',
          sideOffset: 8,
        }"
        :delay-duration="0"
        text="Verified"
        arrow
      >
        <UIcon name="lucide:badge-check" class="size-5 text-blue-500" />
      </UTooltip>
    </template>
    <template v-else>
      <UTooltip
        :content="{
          align: 'center',
          side: 'top',
          sideOffset: 8,
        }"
        :delay-duration="0"
        text="Verified"
        arrow
      >
        <UIcon name="lucide:triangle-alert" class="size-5 text-amber-500" />
        <template #content>
          <p>
            <!-- @todo - update copy comment on it -->
            This product is not claimed.
            <button class="text-secondary" @click="handleClaim">
              Claim It
            </button>
          </p>
        </template>
      </UTooltip>
    </template>
  </div>
</template>

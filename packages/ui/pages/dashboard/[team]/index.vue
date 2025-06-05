<script lang="ts" setup>
  const { currentTeam } = useTeam()
</script>

<template>
  <AppContainer :title="`${currentTeam?.name} Home`">
    <p>Under construction...</p>
  </AppContainer>
</template>

<script setup lang="ts">

</script>

<template>
  <ClHeader />
  <section un-flex="~ 1" un-h="full" un-overflow="hidden">
    <ClAside />
    <section un-flex="~ 1 col" un-h="full" un-overflow="hidden">
      <main un-flex="1" un-overflow="auto" un-p="12rem" un-box-border>
        <slot />
      </main>
      <ClFooter />
    </section>
  </section>
</template>

<style scoped>

</style>

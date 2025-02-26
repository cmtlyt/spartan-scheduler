<script setup lang="ts">
</script>

<template>
  <LayoutHeader />
  <section un-flex="~ 1" un-h="full" un-overflow="hidden">
    <LayoutAside />
    <section un-flex="~ 1 col" un-h="full" un-overflow="hidden">
      <main un-flex="1" un-overflow="auto" un-p="12rem" un-box-border>
        <slot />
      </main>
      <LayoutFooter />
    </section>
  </section>
</template>

<style scoped>
</style>

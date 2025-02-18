<script setup lang="ts">
const route = useRoute();
logger.appear('.page-enter.0', { test: 'message' });
logger.event('.page-enter.0', 'click', { test: 'message' });
</script>

<template>
  <div>
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <p>{{ $t('hello') }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>

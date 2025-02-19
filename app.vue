<script lang="ts" setup>
useHeadSafe({
  title: 'Spartan Scheduler',
  link: [
    { rel: 'icon', type: 'image/png', href: '/logo.png' },
  ],
});
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

html {
  font-size: 1px;
}

body {
  margin: 0;
  font-size: 16rem;
}

section {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

#root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}
</style>

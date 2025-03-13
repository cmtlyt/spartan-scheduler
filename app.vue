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
  <Toast />
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

p {
  margin: 0;
}

img {
  font-size: 0;
  vertical-align: middle;
}

#root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;
}

.card-shadow {
  box-shadow: 0 0 10rem -6rem var(--p-primary-color);
}

.p-inputtext.p-inputtext,
.p-button.p-button {
  font-size: 16rem;
}

.p-select-list-container {
  max-height: 160rem !important;
}
</style>

<script setup lang="ts">
import ColorChange from './cl-header/color-change.vue';
import MessageIcon from './cl-header/message-icon.vue';

const messageCount = ref(0);
</script>

<template>
  <header un-flex="~" un-justify="between" un-p="x-12rem y-4rem" class="header-container">
    <section class="title-bar">
      <ClImage
        un-size="40rem"
        src="/logo.png"
      />
    </section>
    <section class="tool-bar" un-flex un-items="center" un-gap="x-18rem">
      <ColorChange />
      <MessageIcon :message-count="messageCount" />
      <Avatar icon="pi pi-user" size="large">
        <Icon name="clarity:avatar-solid" un-size="24rem" />
      </Avatar>
    </section>
  </header>
</template>

<style scoped>
.header-container {
  box-shadow: 0 0 10rem -6rem var(--p-primary-color);
}
</style>

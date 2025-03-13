<script setup lang="ts">
import type { TieredMenuMethods } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';

const { t } = useI18n();

const messageCount = ref(0);
const avatarTieredMenu = ref<TieredMenuMethods>();

const avatarTieredMenuModel: MenuItem[] = [
  {
    label: t('layout.header.logout'),
    command: () => navigateTo('/api/auth/logout', { replace: true, open: { target: '_self' } }),
  },
];
</script>

<template>
  <header un-flex="~" un-justify="between" un-p="x-12rem y-4rem" class="card-shadow">
    <section un-flex un-items="center">
      <RouterLink to="/dashboard">
        <ClImage
          un-size="40rem"
          src="/logo.png"
        />
      </RouterLink>
    </section>
    <section un-flex un-items="center" un-gap="x-18rem">
      <ColorChange />
      <MessageIcon :message-count="messageCount" />
      <Avatar icon="pi pi-user" size="large" @click="avatarTieredMenu?.toggle($event)">
        <Icon name="clarity:avatar-solid" un-size="24rem" />
      </Avatar>
    </section>
    <TieredMenu ref="avatarTieredMenu" :model="avatarTieredMenuModel" popup />
  </header>
</template>

<style scoped>
</style>

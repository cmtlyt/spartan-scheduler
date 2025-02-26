<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();

const items = ref([
  {
    label: t('aside.ybp'),
    icon: 'mage:dashboard-bar',
    route: '/dashboard',
  },
]);
</script>

<template>
  <aside class="aside-container" un-p="y-4rem x-2rem">
    <Menu :model="items">
      <template #item="{ item }">
        <RouterLink v-tooltip="item.label" :to="item.route" un-flex un-p="4rem">
          <Icon :name="item.icon!" un-size="40rem" />
        </RouterLink>
      </template>
    </Menu>
  </aside>
</template>

<style scoped lang="scss">
.aside-container {
  box-shadow: 0 0 10rem -6rem var(--p-primary-color);
}
.aside-container:deep() {
  .p-menu {
    border: none;
  }
}
</style>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();

const model = computed(() => {
  return route.matched.map((item) => {
    return {
      label: t(item.meta.i18nTitle as string),
      url: item.path,
    };
  });
});
</script>

<template>
  <footer un-p="x-8rem" class="footer-container" un-text="14rem">
    <Breadcrumb :home="model[0]" :model="model.slice(1)">
      <template #item="{ item }">
        <span v-if="item.url === route.path" un-text="$p-text-color">
          {{ item.label }}
        </span>
        <RouterLink
          v-else
          :to="item.url!"
          un-text="gray-500"
          un-hover="text-$p-text-color"
          un-transition="colors duration-300 ease-in-out"
        >
          {{ item.label }}
        </RouterLink>
      </template>
    </Breadcrumb>
  </footer>
</template>

<style scoped>
.footer-container {
  box-shadow: 0 0 10rem -6rem var(--p-primary-color);
}
</style>

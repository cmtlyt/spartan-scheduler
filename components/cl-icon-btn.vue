<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string;
  iconSize?: string;
}>(), {
  iconSize: '100%',
});
</script>

<template>
  <Button
    severity="contrast" variant="outlined"
    un-p="!4rem"
    un-size="28rem"
    class="icon-btn"
  >
    <Icon :name="name" class="icon" />
  </Button>
</template>

<style scoped lang="scss">
.icon-btn {
  .icon {
    width: v-bind('props.iconSize');
    height: v-bind('props.iconSize');
  }
}
</style>

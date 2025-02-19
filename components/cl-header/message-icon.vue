<script setup lang="ts">
defineProps<{
  messageCount?: number;
}>();
</script>

<template>
  <RouterLink to="/message-center" un-relative un-flex un-items="center">
    <Badge
      v-if="messageCount"
      :value="messageCount" severity="danger" size="small"
      un-absolute un-top="0" un-right="0" un-z="1"
      un-transform="translate-x-[30%] translate-y-[-30%]"
      un-border="2rem solid currentColor"
    />
    <ClIconBtn name="material-symbols:notifications" un-size="26rem" variant="text" un-p="!0" />
  </RouterLink>
</template>

<script lang="ts" setup>
import type { Task } from '~/types/task';

const route = useRoute();
const clFetch = useClFetch();

const { data } = useAsyncData<Task>(async () => {
  return clFetch('/api/task/:id', { params: { id: route.query.id } }).then((res) => {
    if (res.success)
      return res.data!;
    return Promise.reject(res.message);
  });
});
</script>

<template>
  <TaskDetailPanel :task-info="data" />
</template>

<style lang="scss" scoped>

</style>

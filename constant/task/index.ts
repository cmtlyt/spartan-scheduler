import type { Option } from '~/types/task';

export const statusOptions = ref<Option[]>([
  { label: '进行中', value: '进行中' },
  { label: '待开始', value: '待开始' },
  { label: '已完成', value: '已完成' },
]);

export const priorityOptions = ref<Option[]>([
  { label: '高', value: '高' },
  { label: '中', value: '中' },
  { label: '低', value: '低' },
]);

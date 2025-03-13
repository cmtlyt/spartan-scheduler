<script setup lang="ts">
import type { DataTableFilterEvent, DataTableFilterMeta, DataTableFilterMetaData, DataTablePageEvent } from 'primevue';
import { clipboard, gc } from '@cmtlyt/base';

interface Task {
  id: number;
  name: string;
  content: string;
  createdDate: string;
  creator: string;
  creatorAvatar: string;
  assignee: string;
  assigneeAvatar: string;
  status: string;
  priority: string;
  project: string;
  participants?: string[];
  updater: string;
  updatedDate: string;
}

interface Option {
  label: string;
  value: string;
}

interface SearchInfo {
  first: number;
  rows: number;
  loading: boolean;
  totalRecords: number;
  filters: DataTableFilterMeta;
}

definePageMeta({
  i18nTitle: 'aside.rwlb',
});

const toast = useClToast();

const tasks = ref<Task[]>([]);
const lockedTasks = ref<Task[]>([]);
const searchInfo = reactive<SearchInfo>({
  first: 0,
  rows: 10,
  loading: false,
  totalRecords: 100,
  filters: { },
});

const statusOptions = ref<Option[]>([
  { label: '进行中', value: '进行中' },
  { label: '待开始', value: '待开始' },
  { label: '已完成', value: '已完成' },
]);

const priorityOptions = ref<Option[]>([
  { label: '高', value: '高' },
  { label: '中', value: '中' },
  { label: '低', value: '低' },
]);

const drawerVisible = ref(false);
const selectedTask = ref<Task | null>(null);

function showTaskDetails(task: Task) {
  selectedTask.value = task;
  drawerVisible.value = true;
}

function updateData(event: DataTablePageEvent | DataTableFilterEvent) {
  searchInfo.rows = event.rows;
  searchInfo.first = event.first;
  fetchTasks();
}

// 添加复制方法
function copyId(id: number) {
  if (!clipboard.isClearable) {
    return toast.error({ summary: '复制失败', detail: '剪贴板不可用' });
  }
  clipboard.copy(String(id));
  toast.success({ summary: '复制成功', detail: `任务ID ${id} 已复制` });
}

function toggleLock(data: Task, frozen: boolean, index: number) {
  if (frozen) {
    lockedTasks.value = lockedTasks.value.filter((_, i) => i !== index);
    tasks.value.push(data);
    return;
  }
  tasks.value = tasks.value.filter((_, i) => i !== index);
  lockedTasks.value.push(data);
}

function filterInfoFormat(filterInfo: DataTableFilterMeta) {
  return Object.keys(filterInfo).reduce((acc, key) => {
    const item = filterInfo[key];
    if (typeof item === 'string') {
      acc[key] = item;
    }
    else if ((filterInfo[key] as DataTableFilterMetaData).value) {
      acc[key] = (filterInfo[key] as any).value;
    }
    return acc;
  }, {} as Record<string, any>);
}

async function fetchTasks() {
  searchInfo.loading = true;
  return $fetch('/api/task/list', {
    method: 'get',
    query: { first: searchInfo.first, size: searchInfo.rows, filters: filterInfoFormat(unref(searchInfo.filters)) },
  }).then((res) => {
    tasks.value = res.data;
    searchInfo.totalRecords = res.total;
    return tasks.value;
  }).finally(() => {
    searchInfo.loading = false;
  });
}

function clearFilter() {
  initFilterInfo();
  updateData({ ...unref(searchInfo), first: 0 } as any);
}

function initFilterInfo() {
  searchInfo.filters = {
    id: { value: '', matchMode: 'equals' },
    name: { value: '', matchMode: 'contains' },
    status: { value: '', matchMode: 'equals' },
    priority: { value: '', matchMode: 'equals' },
    creator: { value: '', matchMode: 'contains' },
    assignee: { value: '', matchMode: 'contains' },
  };
}

initFilterInfo();

onMounted(() => {
  fetchTasks();
});
</script>

<template>
  <section un-h="full">
    <DataTable
      v-model:filters="searchInfo.filters"
      class="data-table-container"
      un-flex="~ col"
      un-h="full"
      :value="tasks" :rows="searchInfo.rows"
      striped-rows :total-records="searchInfo.totalRecords"
      scrollable scroll-height="flex"
      :frozen-value="lockedTasks"
      lazy :loading="searchInfo.loading"
      filter-display="menu"
      :global-filter-fields="['name', 'status', 'priority', 'creator', 'assignee', 'project']"
      paginator always-show-paginator :rows-per-page-options="[10, 15, 20, 30]"
      paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      @page="updateData"
      @filter="updateData"
    >
      <template #header>
        <div class="flex justify-between">
          <ClIconBtn name="material-symbols:filter-alt-off-outline" @click="clearFilter" />
          <IconField un-w="150rem" un-h="30rem">
            <InputIcon style="--p-icon-size: 20rem">
              <Icon name="material-symbols:search-rounded" un-size="20rem" />
            </InputIcon>
            <InputText v-model="(searchInfo.filters.id as any).value" un-size="full" @change="fetchTasks" />
          </IconField>
        </div>
      </template>
      <Column header="任务名称" filter-field="name" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
        </template>
        <template #body="slotProps">
          <section line-clamp="1" @click="showTaskDetails(slotProps.data)">
            <span>{{ slotProps.data.name }}</span>
          </section>
        </template>
      </Column>
      <Column header="任务状态" class="w-150rem" filter-field="status" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="statusOptions" option-label="label" option-value="value" placeholder="Select a status" />
        </template>
        <template #body="slotProps">
          <Select v-model="slotProps.data.status" :options="statusOptions" option-label="label" option-value="value" />
        </template>
      </Column>
      <Column header="优先级" class="w-150rem" filter-field="priority" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="priorityOptions" option-label="label" option-value="value" placeholder="Select a priority" />
        </template>
        <template #body="slotProps">
          <Select v-model="slotProps.data.priority" :options="priorityOptions" option-label="label" option-value="value" />
        </template>
      </Column>
      <Column header="创建人" class="w-150rem" filter-field="creator" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" class="p-column-filter" placeholder="Search by creator" />
        </template>
        <template #body="slotProps">
          <div class="flex items-center">
            <ClImage :src="slotProps.data.creatorAvatar" un-size="20rem" un-rounded-full un-mr="4rem" />
            {{ slotProps.data.creator }}
          </div>
        </template>
      </Column>
      <Column header="接手人" class="w-150rem" filter-field="assignee" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" class="p-column-filter" placeholder="Search by assignee" />
        </template>
        <template #body="slotProps">
          <div class="flex items-center">
            <ClImage :src="slotProps.data.assigneeAvatar" un-size="20rem" un-rounded-full un-mr="4rem" />
            {{ slotProps.data.assignee }}
          </div>
        </template>
      </Column>
      <Column field="project" header="所属项目" class="w-200rem" />
      <Column class="w-60rem">
        <template #body="{ data, frozenRow, index }">
          <section @click="toggleLock(data, frozenRow, index)">
            <ClIconBtn v-if="frozenRow" name="material-symbols:lock-outline" />
            <ClIconBtn v-else name="material-symbols:lock-open-right-outline-rounded" />
          </section>
        </template>
      </Column>
    </DataTable>

    <Drawer
      v-model:visible="drawerVisible"
      class="task-detail-drawer"
      un-w="1200rem!"
      :header="selectedTask?.name" :modal="true" position="right"
    >
      <section v-if="selectedTask" un-h="full" un-flex>
        <section class="content-container" un-mb="4rem" un-flex="~ 1 col" un-overflow="x-hidden y-auto">
          <Editor v-model="selectedTask.content" class="task-detail-editor" un-flex="~ 1 col">
            <template #toolbar>
              <section un-flex un-items="center" un-h="2.5em">
                详情
              </section>
              <section>
                <span>{{ selectedTask.creator }}</span>
                <span>创建于</span>
                <span>{{ selectedTask.createdDate }}</span>
                <span>,</span>
                <span>{{ selectedTask.updater }}</span>
                <span>更新于</span>
                <span>{{ selectedTask.updatedDate }}</span>
              </section>
            </template>
          </Editor>
          <section un-bg="red">
            command
          </section>
        </section>

        <section
          :class="gc(
            'other-info-container',
            ['[&>section]:grid', '[&>section]:grid-cols-[6em_1fr]', '[&>section]:h-40rem', '[&>section]:items-center'],
          )"
          un-flex="~ col"
          un-gap="10rem"
          un-box-border
          un-w="350rem"
          un-pl="1em"
        >
          <section>
            <strong>ID:</strong>
            <section>
              <span>{{ selectedTask.id }}</span>
              <span un-ml="1em" un-text="$p-primary-color" @click="copyId(selectedTask.id)">复制</span>
            </section>
          </section>
          <section>
            <strong>状态:</strong>
            <Select v-model="selectedTask.status" :options="statusOptions" option-label="label" option-value="value" />
          </section>
          <section>
            <strong>接手人:</strong>
            <span>{{ selectedTask.assignee }}</span>
          </section>
          <section>
            <strong>优先级:</strong>
            <Select v-model="selectedTask.priority" :options="priorityOptions" option-label="label" option-value="value" />
          </section>
          <section>
            <strong>所属项目:</strong>
            <span>{{ selectedTask.project }}</span>
          </section>
          <section>
            <strong>参与者:</strong>
            <section un-flex="~ wrap" un-gap="2rem" un-mt="2rem">
              <Tag v-for="(participant, index) in selectedTask.participants" :key="index">
                {{ participant }}
              </Tag>
            </section>
          </section>
        </section>
      </section>
    </Drawer>
  </section>
</template>

<style scoped lang="scss">
.data-table-container:deep() {
  .p-datatable-table-container::-webkit-scrollbar {
    width: 0;
  }

  .p-datatable-paginator-bottom {
    border-width: 1rem 0 0;
  }
}

.other-info-container {
  border-left: var(--p-primary-200) 1rem solid;
}

:global(.task-detail-drawer .p-drawer-header) {
  border-bottom: var(--p-primary-200) 1rem solid;
}

.content-container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

.task-detail-editor:deep() {
  .p-editor-toolbar,
  .ql-editor {
    padding: 0;
    border-radius: 0;
  }

  .ql-editor {
    padding-top: 10rem;
  }

  .p-editor-content,
  .p-editor-toolbar {
    border: none !important;
  }

  .p-editor-content {
    flex: 1;
  }

  .p-editor-toolbar {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 0 10rem -6rem var(--p-primary-color);
  }
}
</style>

<script setup lang="ts">
import type { DataTableFilterEvent, DataTableFilterMeta, DataTableFilterMetaData, DataTablePageEvent } from 'primevue';
import type { Task } from '~/types/task';
import { priorityOptions, statusOptions } from '~/constant/task';

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

const dialog = useDialog();
const { t } = useI18n();

const tasks = ref<Task[]>([]);
const lockedTasks = ref<Task[]>([]);
const searchInfo = reactive<SearchInfo>({
  first: 0,
  rows: 10,
  loading: false,
  totalRecords: 100,
  filters: { },
});

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

function openCreateTaskDialog() {
  dialog.open(defineAsyncComponent(() => import('~/components/task/info-form.vue')), {
    props: {
      header: t('component.taskInfoForm.title'),
      modal: true,
      draggable: true,
    },
    emits: {
      onSubmit(data: any) {
        logger.debug(data);
      },
    },
  });
}

function updateTaskInfo(value: string, field: string, data: Task) {
  logger.debug(field, value, data);
}

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
        <section class="flex justify-between">
          <ClIconBtn name="material-symbols:filter-alt-off-outline" @click="clearFilter" />
          <section un-flex gap="8rem">
            <IconField un-w="150rem" un-h="30rem">
              <InputIcon style="--p-icon-size: 20rem">
                <Icon name="material-symbols:search-rounded" un-size="20rem" />
              </InputIcon>
              <InputText v-model="(searchInfo.filters.id as any).value" un-size="full" placeholder="Search by id" @change="fetchTasks" />
            </IconField>
            <ClIconBtn name="material-symbols:add-diamond-rounded" @click="openCreateTaskDialog" />
          </section>
        </section>
      </template>
      <Column :header="$t('component.taskInfoForm.headerLabel.name')" filter-field="name" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <InputText v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
        </template>
        <template #body="slotProps">
          <section line-clamp="1" @click="showTaskDetails(slotProps.data)">
            <span>{{ slotProps.data.name }}</span>
          </section>
        </template>
      </Column>
      <Column :header="$t('component.taskInfoForm.headerLabel.status')" class="w-150rem" filter-field="status" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="statusOptions" option-label="label" option-value="value" placeholder="Select a status" />
        </template>
        <template #body="slotProps">
          <Select
            :model-value="slotProps.data.status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            @change="updateTaskInfo($event.value, 'status', slotProps.data)"
          />
        </template>
      </Column>
      <Column :header="$t('component.taskInfoForm.headerLabel.priority')" class="w-150rem" filter-field="priority" :show-filter-match-modes="false">
        <template #filter="{ filterModel }">
          <Select v-model="filterModel.value" :options="priorityOptions" option-label="label" option-value="value" placeholder="Select a priority" />
        </template>
        <template #body="slotProps">
          <Select
            :model-value="slotProps.data.priority"
            :options="priorityOptions"
            option-label="label"
            option-value="value"
            @change="updateTaskInfo($event.value, 'priority', slotProps.data)"
          />
        </template>
      </Column>
      <Column :header="$t('component.taskInfoForm.headerLabel.creator')" class="w-150rem" filter-field="creator" :show-filter-match-modes="false">
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
      <Column :header="$t('component.taskInfoForm.headerLabel.assignee')" class="w-150rem" filter-field="assignee" :show-filter-match-modes="false">
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
      <Column field="project" :header="$t('component.taskInfoForm.headerLabel.projectGroup')" class="w-200rem" />
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
      <TaskDetailPanel
        :task-info="selectedTask"
        @change="({ value, field, data }) => updateTaskInfo(value, field, data)"
      />
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

.content-container::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

:global(.task-detail-drawer .p-drawer-header) {
  border-bottom: var(--p-primary-200) 1rem solid;
}
</style>

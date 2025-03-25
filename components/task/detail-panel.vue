<script lang="ts" setup>
import type { Task } from '~/types/task';
import { clipboard, gc } from '@cmtlyt/base';
import { priorityOptions, statusOptions } from '~/constant/task';

const props = defineProps<{
  taskInfo?: Task | null;
}>();

const emit = defineEmits<{
  (e: 'change', data: { data: Task; field: string; value: any }): void;
}>();

const toast = useClToast();
const { t } = useI18n();

const readonly = ref(true);
const currentContent = ref(props.taskInfo?.content || '');

// 添加复制方法
function copyId(id: number) {
  if (!clipboard.isClearable) {
    return toast.error({ summary: t('component.taskDetailPanel.copy.error.title'), detail: t('component.taskDetailPanel.copy.error.content') });
  }
  clipboard.copy(String(id));
  toast.success({ summary: t('component.taskDetailPanel.copy.success.title'), detail: t('component.taskDetailPanel.copy.success.content', { id }) });
}

function changeHandler(value: any, field: string, data: Task) {
  emit('change', { data, field, value });
}

function toggleReadonly() {
  readonly.value = !readonly.value;
  if (readonly.value && currentContent.value !== props.taskInfo?.content) {
    emit('change', { data: props.taskInfo!, field: 'content', value: currentContent.value });
  }
}
</script>

<template>
  <section v-if="taskInfo" un-h="full" un-flex>
    <section class="content-container" un-mb="4rem" un-flex="~ 1 col" un-overflow="x-hidden y-auto">
      <Editor v-model="currentContent" :readonly class="task-detail-editor" un-flex="~ 1 col">
        <template #toolbar>
          <section un-flex un-items="center" un-h="2.5em">
            {{ $t('component.taskDetailPanel.descTitle') }}
          </section>
          <section un-flex un-justify="between" un-p="y-8rem">
            <section>
              {{ $t('component.taskDetailPanel.editInfo', {
                creator: taskInfo.creator,
                createdDate: taskInfo.createdDate,
                updater: taskInfo.updater,
                updatedDate: taskInfo.updatedDate,
              }) }}
            </section>
            <ClIconBtn
              :name="readonly as boolean ? 'material-symbols:edit-square-outline' : 'material-symbols:check'"
              :class="gc(['!border-none', {
                ['!bg-$p-primary-color !color-$p-button-primary-color']: !readonly,
              }])"
              @click="toggleReadonly"
            />
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
        <strong>{{ $t('module.task.id') }}:</strong>
        <section>
          <span>{{ taskInfo.id }}</span>
          <span un-ml="1em" un-text="$p-primary-color" @click="copyId(taskInfo.id)">{{ $t('component.taskDetailPanel.copyId') }}</span>
        </section>
      </section>
      <section>
        <strong>{{ $t('module.task.status') }}:</strong>
        <Select
          :model-value="taskInfo!.status"
          :options="statusOptions"
          option-label="label"
          option-value="value"
          @change="changeHandler($event.value, 'status', taskInfo)"
        />
      </section>
      <section>
        <strong>{{ $t('module.task.assignee') }}:</strong>
        <span>{{ taskInfo.assignee }}</span>
      </section>
      <section>
        <strong>{{ $t('module.task.priority') }}:</strong>
        <Select
          :model-value="taskInfo!.priority"
          :options="priorityOptions"
          option-label="label"
          option-value="value"
          @change="changeHandler($event.value, 'priority', taskInfo)"
        />
      </section>
      <section>
        <strong>{{ $t('module.task.projectGroup') }}:</strong>
        <span>{{ taskInfo.project }}</span>
      </section>
      <section>
        <strong>{{ $t('module.task.participants') }}:</strong>
        <section un-flex="~ wrap" un-gap="2rem" un-mt="2rem">
          <Tag v-for="(participant, index) in taskInfo.participants" :key="index">
            {{ participant }}
          </Tag>
        </section>
      </section>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.content-container:deep() {
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

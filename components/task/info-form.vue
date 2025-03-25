<script lang="ts" setup>
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import type { Task } from '~/types/task';
import defu from 'defu';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

interface Props {
  taskInfo?: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'submit', data: any): void;
}>();

const dialogRef = inject<Ref<DynamicDialogInstance & { data: Props }>>('dialogRef');

const taskInfo = computed((): Task => {
  return defu(props.taskInfo, dialogRef?.value.data?.taskInfo || {});
});

const { t } = useI18n();

const requiredTip = (label: string) => t('component.taskInfoForm.requiredTip', { label });

const taskInfoSchema = yup.object({
  name: yup.string().required(requiredTip(t('module.task.name'))),
  content: yup.string().required(requiredTip(t('module.task.content'))),
  priority: yup.string().required(requiredTip(t('module.task.priority'))),
  assigneeId: yup.string().required(requiredTip(t('module.task.assignee'))),
  projectId: yup.string().required(requiredTip(t('module.task.projectGroup'))),
});

function onFormSubmit(values: any) {
  emit('submit', values);
  dialogRef?.value.close();
}
</script>

<template>
  <section un-min-w="50vw" un-pt="6rem">
    <Form
      un-flex="~ col" un-gap="8rem"
      :initial-values="taskInfo" :validation-schema="taskInfoSchema"
      @submit="onFormSubmit"
    >
      <section un-flex="~ col" un-gap="8rem" un-w="full" un-max-h="60vh" un-overflow-y="auto">
        <Field v-slot="{ field }" name="projectId">
          <IftaLabel>
            <InputText v-bind="field" type="text" fluid autocomplete="off" />
            <label>{{ $t('module.task.projectGroup') }}</label>
          </IftaLabel>
          <ErrorMessage name="projectId" text="$p-form-field-invalid-placeholder-color" />
        </Field>
        <Field v-slot="{ field }" name="name">
          <IftaLabel>
            <InputText v-bind="field" type="text" fluid autocomplete="off" />
            <label>{{ $t('module.task.name') }}</label>
          </IftaLabel>
          <ErrorMessage name="name" text="$p-form-field-invalid-placeholder-color" />
        </Field>
        <Field v-slot="{ field }" name="priority">
          <IftaLabel>
            <InputText v-bind="field" type="text" fluid autocomplete="off" />
            <label>{{ $t('module.task.priority') }}</label>
          </IftaLabel>
          <ErrorMessage name="priority" text="$p-form-field-invalid-placeholder-color" />
        </Field>
        <Field v-slot="{ field }" name="assigneeId">
          <IftaLabel>
            <InputText v-bind="field" type="text" fluid autocomplete="off" />
            <label>{{ $t('module.task.assignee') }}</label>
          </IftaLabel>
          <ErrorMessage name="assigneeId" text="$p-form-field-invalid-placeholder-color" />
        </Field>
        <Field v-slot="{ field }" name="content">
          <Editor v-bind="field" class="task-detail-editor" un-flex="~ 1 col" :placeholder="$t('module.task.content')" />
          <ErrorMessage name="content" text="$p-form-field-invalid-placeholder-color" />
        </Field>
      </section>
      <Button type="submit" label="Submit">
        {{ $t('component.taskInfoForm.submit') }}
      </Button>
    </Form>
  </section>
</template>

<style>

</style>

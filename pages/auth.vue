<script setup lang="ts">
import { hash } from 'ohash';
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';
import { CLIENT_LOCAL_USER_INFO_KEY } from '~/constant/storage-key';
import { pickRename } from '~/utils/pick-rename';

definePageMeta({
  layout: false,
});

const { t } = useI18n();
const $clFetch = useClFetch();
const toast = useClToast();
const { query } = useRoute();

const isLogin = ref(true);

const registerSchema = yup.object({
  username: yup.string().required(t('pages.auth.fields.username.errors.required')),
  nickname: yup.string(),
  password: yup.string().required(t('pages.auth.fields.password.errors.required')).matches(/^(?=.*\d)(?=.*[a-z]).{8,20}$/i, t('pages.auth.fields.password.errors.lowLevel')),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined, ''], t('pages.auth.fields.confirmPassword.errors.notMatch')).matches(/^(?=.*\d)(?=.*[a-z]).{8,20}$/i, t('pages.auth.fields.password.errors.lowLevel')),
  email: yup.string().email(t('pages.auth.fields.email.errors.notEmail')).required(t('pages.auth.fields.email.errors.required')),
});

const loginSchema = yup.object({
  username: yup.string().required(t('pages.auth.fields.username.errors.required')),
  password: yup.string().required(t('pages.auth.fields.password.errors.required')).matches(/^(?=.*\d)(?=.*[a-z]).{8,20}$/i, t('pages.auth.fields.password.errors.lowLevel')),
});

const errorI18nKeyMap: Record<string, string> = {
  AccountOrPasswordEmpty: t('pages.auth.errors.accountOrPasswordEmpty'),
  AccountOrPasswordIncorrect: t('pages.auth.errors.accountOrPasswordIncorrect'),
  RegisterField: t('pages.auth.errors.registerField'),
};

function getMessage(key?: string) {
  return errorI18nKeyMap[key!];
}

async function loginHandler(value: any) {
  const body = pickRename(['username:account', 'password'], value);
  body.password = hash({ account: body.account, password: body.password });
  const res = await $clFetch(`/api/auth/login`, { method: 'post', body });
  if (!res.success) {
    toast.error({
      summary: t('pages.auth.errors.loginErrorTitle'),
      detail: getMessage(res.metadata?.i18nKey) || res.message,
    });
    throw new Error(res.message);
  }
  return res;
}

async function registerHandler(value: any) {
  const body = pickRename(['username:account', 'password', 'nickname:name', 'email'], value);
  body.password = hash({ account: body.account, password: body.password });
  const res = await $clFetch('/api/auth/register', { method: 'post', body });
  if (!res.success) {
    toast.error({
      summary: t('pages.auth.errors.registerErrorTitle'),
      detail: getMessage(res.metadata?.i18nKey) || res.message,
    });
    throw new Error(res.message);
  }
  return res;
}

async function onFormSubmit(values: any) {
  (isLogin.value ? loginHandler : registerHandler)(values).then((res) => {
    toast.success({
      summary: t(`pages.auth.${isLogin.value ? 'login' : 'register'}.success`),
    });
    localStorage.setItem(CLIENT_LOCAL_USER_INFO_KEY, JSON.stringify(res.data));
    navigateTo((query.callback as string) || '/dashboard', { replace: true, open: { target: '_self' } });
  }).catch(() => {});
}

onMounted(() => {
  if (query.clearUserInfo) {
    localStorage.removeItem(CLIENT_LOCAL_USER_INFO_KEY);
  }
});
</script>

<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <transition
      mode="out-in"
      enter-active-class="entry-active"
      leave-active-class="leave-active"
      enter-from-class="enter-from"
      leave-to-class="leave-to"
    >
      <div v-if="isLogin" key="login" class="w-400rem p-24rem bg-white rounded-1em card-shadow">
        <h2 class="text-24rem leading-32rem font-bold text-center mb-16rem">
          {{ $t('pages.auth.login.title') }}
        </h2>
        <Form :validation-schema="loginSchema" class="flex flex-col gap-8rem w-full" @submit="onFormSubmit">
          <Field v-slot="{ field }" name="username">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.username.label') }}</label>
              <InputText v-bind="field" type="text" fluid />
            </FloatLabel>
            <ErrorMessage name="username" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Field v-slot="{ field }" name="password">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.password.label') }}</label>
              <InputText v-bind="field" type="password" fluid />
            </FloatLabel>
            <ErrorMessage name="password" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Button type="submit" severity="secondary" label="Submit">
            {{ $t('pages.auth.login.submit') }}
          </Button>
        </Form>
        <p class="text-center mt-16rem">
          {{ $t('pages.auth.login.notAccount') }}
          <span class="text-blue-500 cursor-pointer" @click="isLogin = false">{{ $t('pages.auth.register.title') }}</span>
        </p>
      </div>
      <div v-else key="register" class="w-400rem p-24rem bg-white rounded-1em card-shadow">
        <h2 class="text-24rem leading-32rem font-bold text-center mb-16rem">
          {{ $t('pages.auth.register.title') }}
        </h2>
        <Form :validation-schema="registerSchema" class="flex flex-col gap-8rem w-full" @submit="onFormSubmit">
          <Field v-slot="{ field }" name="username">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.username.label') }}</label>
              <InputText v-bind="field" required type="text" fluid />
            </FloatLabel>
            <ErrorMessage name="username" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Field v-slot="{ field }" name="nickname">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.nickname.label') }}</label>
              <InputText v-bind="field" required type="text" fluid />
            </FloatLabel>
          </Field>
          <Field v-slot="{ field }" name="password">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.password.label') }}</label>
              <InputText v-bind="field" required type="password" fluid />
            </FloatLabel>
            <ErrorMessage name="password" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Field v-slot="{ field }" name="confirmPassword">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.confirmPassword.label') }}</label>
              <InputText v-bind="field" required type="confirmPassword" fluid />
            </FloatLabel>
            <ErrorMessage name="confirmPassword" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Field v-slot="{ field }" name="email">
            <FloatLabel variant="on">
              <label>{{ $t('pages.auth.fields.email.label') }}</label>
              <InputText v-bind="field" required type="email" fluid />
            </FloatLabel>
            <ErrorMessage name="email" text="$p-form-field-invalid-placeholder-color" />
          </Field>
          <Button type="submit" severity="secondary" label="Submit">
            {{ $t('pages.auth.register.submit') }}
          </Button>
        </Form>
        <p class="text-center mt-16rem">
          {{ $t('pages.auth.register.hasAccount') }}
          <span class="text-green-500 cursor-pointer" @click="isLogin = true">{{ $t('pages.auth.login.title') }}</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<style>
.enter-active,
.leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.enter-from,
.leave-to {
  opacity: 0;
  transform: translateY(-20rem);
}
</style>

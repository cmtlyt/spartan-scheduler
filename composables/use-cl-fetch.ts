import type { Operation } from '~/types/operation';
import { isFalse, safeGetGlobal } from '@cmtlyt/base';
import { CLIENT_LOCAL_USER_INFO_KEY } from '~/constant/storage-key';

type FetchFunc = typeof $fetch;

async function operationHandler(_res: any, operation?: Operation) {
  if (!operation)
    return;
  if (operation.clearUserInfo) {
    localStorage.removeItem(CLIENT_LOCAL_USER_INFO_KEY);
  }
  // 页面重定向处理
  if (operation.redirect) {
    const { path, callback: _callback } = operation.redirect;
    let callback = _callback;
    // 后端未传递 callback 时, 获取当前页面的 href
    if (!callback) {
      callback = safeGetGlobal().location?.href;
    }
    // 后端明确不需要 callback, 或获取不到 href 时, 直接跳转后端传递的 path
    if (isFalse(_callback) || !callback) {
      return navigateTo(path, { replace: true });
    }
    return navigateTo(`${path}?callback=${encodeURIComponent(callback)}`, { replace: true });
  }
}

export function useClFetch(): FetchFunc {
  // const { $csrfFetch } = useNuxtApp();

  const clFetch: FetchFunc = (request, options) => {
    // return $csrfFetch(request, options).then(async (res) => {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-ignore
    return $fetch(request, options).then(async (res) => {
      await operationHandler(res, (res as any).metadata?.operation);
      return res;
    }, async (error) => {
      return error;
    });
  };

  clFetch.raw = $fetch.raw;
  clFetch.create = $fetch.create;

  return clFetch;
}

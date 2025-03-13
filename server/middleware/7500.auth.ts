import { iife } from '@cmtlyt/base';

declare module 'h3' {
  interface H3EventContext {
    userInfo: {
      userId: string;
      account: string;
      email: string;
      name?: string | null;
      avatar?: string | null;
    };
  }
}

const whiteList = ['/', '/api/auth/login', '/api/auth/register', '/api/auth/logout'];

function ignorePath(path: string) {
  return (
    // 白名单
    whiteList.includes(path)
    // 以 /_ 开头的路径, 例如 /_ipx
    || path.startsWith('/_')
    // 以 api/_ 开头的路径, 例如/api/_nuxt_icon
    || path.startsWith('/api/_')
    // 认证相关页面
    || path.startsWith('/auth')
  );
}

/**
 * 认证中间件
 *
 * 页面访问无认证信息则直接重定向到登录页面
 * 接口访问无认证信息则直接返回错误
 */
export default defineEventHandler(async (event) => {
  const result = await iife(async () => {
    // 白名单
    if (ignorePath(event.path))
      return;
    // 获取 sessionId
    const sessionId = getSessionId(event);
    if (sessionId) {
      // 获取 session
      const userInfo = await getSessionInfo(event, sessionId);
      if (!userInfo) {
        // 如果不是接口重定向到登录页面
        if (!event.path.startsWith('/api'))
          return sendRedirect(event, `/auth?callback=${encodeURIComponent(event.path)}&clearUserInfo=true`, 302);
        return event.context.fail('请登录', { i18nKey: 'auth.errors.notLogin', operation: { redirect: { path: `/auth` }, clearUserInfo: true } });
      }
      event.context.userInfo = userInfo as any;
      return;
    }
    // sessionId 过期
    // 获取用户信息
    const userInfo = await getUserInfoFromRefreshToken(event);
    // 不存在则未登录
    if (!userInfo) {
      // 如果不是接口重定向到登录页面
      if (!event.path.startsWith('/api'))
        return sendRedirect(event, `/auth?callback=${encodeURIComponent(event.path)}&clearUserInfo=true`, 302);
      return event.context.fail('请登录', { i18nKey: 'auth.errors.notLogin', operation: { redirect: { path: `/auth`, callback: event.path }, clearUserInfo: true } });
    }
    // 更新 sessionId
    const newSessionId = updateSessionId(event, userInfo.userId);
    const sessionData = await updateSessionInfo(event, newSessionId, userInfo);
    event.context.userInfo = sessionData;
  }, []);

  if (result)
    return result;
});

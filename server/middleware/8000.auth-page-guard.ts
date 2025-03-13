import { iife } from '@cmtlyt/base';

/**
 * 认证页面守卫
 *
 * 访问的是认证页面
 * 有用户信息
 * 跳转到 dashboard
 */
export default defineEventHandler(async (event) => {
  if (event.method === 'GET' && event.path === '/auth') {
    const noRedirect = await iife(async () => {
      const sessionId = getSessionId(event);
      if (!sessionId)
        return true;
      const userInfo = await getSessionInfo(event, sessionId);
      return !userInfo;
    }, []);
    if (noRedirect)
      return;
    return sendRedirect(event, '/dashboard');
  }
});

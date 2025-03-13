import prisma from '~/lib/prisma';
import { updateRefreshToken, updateSessionId, updateSessionInfo } from '~/server/utils/session-info';

export default defineEventHandler(async (event) => {
  const { account, password } = await readBody(event);

  if (!account || !password)
    return event.context.fail('账号密码不能为空', { i18nKey: 'AccountOrPasswordEmpty' });

  const userInfo = await prisma.user.update({
    select: { userId: true, account: true, email: true, name: true, avatar: true, lastLoginAt: true },
    where: { account, password },
    data: { lastLoginAt: new Date() },
  }).catch(() => {});

  if (!userInfo)
    return event.context.fail('账号密码不正确', { i18nKey: 'AccountOrPasswordIncorrect' });

  const sessionId = updateSessionId(event, userInfo.userId);

  updateRefreshToken(event, userInfo.userId);

  const sessionData = await updateSessionInfo(event, sessionId, userInfo);

  return event.context.success(sessionData);
});

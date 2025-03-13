import { v4 } from 'uuid';
import prisma from '~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { account, password, email, name } = await readBody(event);
  const userInfo = await prisma.user.create({
    select: { userId: true, account: true, email: true, name: true, avatar: true, lastLoginAt: true },
    data: {
      account,
      password,
      name,
      email,
      userId: v4().replace(/-/g, ''),
    },
  }).catch(() => {});

  if (!userInfo)
    return event.context.fail('注册失败', { i18nKey: 'RegisterField' });

  const sessionId = updateSessionId(event, userInfo.userId);

  updateRefreshToken(event, userInfo.userId);

  const sessionData = await updateSessionInfo(event, sessionId, userInfo);

  return event.context.success(sessionData);
});

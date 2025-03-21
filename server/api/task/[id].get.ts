import type { TObject } from '@cmtlyt/base';
import type { User } from '@prisma/client';
import prisma from '~/lib/prisma';
import { transformTaskVo } from '~/server/utils/task.ts';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const taskInfo = await prisma.task.findUnique({
    where: { id: Number(id) },
    include: {
      creatorInfo: true,
      assigneeInfo: true,
      participants: true,
      updaterInfo: true,
      projectInfo: true,
    },
  });

  if (!taskInfo)
    return event.context.fail('未找到该任务');

  const participantUserIds = taskInfo.participants.map(item => item.userId);

  const participantUsers = await prisma.user.findMany({
    where: { userId: { in: participantUserIds } },
    select: { name: true, email: true, userId: true },
  });

  const participantUserMap = participantUsers.reduce((acc, cur) => {
    acc[cur.userId] = cur;
    return acc;
  }, {} as TObject<Pick<User, 'name' | 'email' | 'userId'>>);

  return event.context.success(transformTaskVo({
    ...taskInfo,
    participants: taskInfo.participants.map((item) => {
      return {
        ...item,
        userInfo: participantUserMap[item.userId],
      };
    }),
  }));
});

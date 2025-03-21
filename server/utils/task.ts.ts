import type { ProjectGroup, Task, TaskParticipantUser, User } from '@prisma/client';
import type { Task as TaskVo } from '~/types/task';

export function transformTaskVo(source: Task & {
  assigneeInfo: User;
  projectInfo: ProjectGroup;
  updaterInfo: User;
  creatorInfo: User;
  participants: (TaskParticipantUser & { userInfo: Pick<User, 'name' | 'email'> })[];
}): TaskVo {
  return {
    assignee: source.assigneeInfo.name || source.assigneeInfo.email,
    assigneeAvatar: source.assigneeInfo.avatar || '',
    content: source.content,
    id: source.id,
    name: source.name,
    priority: source.priority,
    project: source.projectInfo.name,
    status: source.status,
    updatedDate: source.updatedAt.toLocaleString(),
    updater: source.updaterInfo.name || source.updaterInfo.email,
    creator: source.creatorInfo.name || source.creatorInfo.email,
    creatorAvatar: source.creatorInfo.avatar || '',
    createdDate: source.createdAt.toLocaleString(),
    participants: source.participants.map(item => item.userInfo.name || item.userInfo.email),
  };
}

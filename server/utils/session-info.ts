import type { TObject } from '@cmtlyt/base';
import { hash } from 'ohash';
import prisma from '~/lib/prisma';

export function getSessionId(event: any) {
  return getCookie(event, 'sessionId');
}

export function generateSessionId(userId: string): string {
  return hash(userId);
}

export async function getSessionInfo(event: any, password: string) {
  const session = await useSession(event, { password });
  return session.data;
}

export async function updateSessionInfo<T extends TObject<any>>(event: any, password: string, data: T): Promise<T & { updateTime: number }> {
  const session = await useSession(event, { password });
  await session.update({ ...data, updateTime: Date.now() });
  return session.data as any;
}

export function updateSessionId(event: any, userId: string) {
  const newSessionId = generateSessionId(userId);
  setCookie(event, 'sessionId', newSessionId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60, // 1 hour
  });
  return newSessionId;
}

export async function getUserInfoFromRefreshToken(event: any) {
  const userId = getCookie(event, 'refreshToken');
  if (!userId)
    return;
  return await prisma.user.findUnique({
    select: { userId: true, account: true, email: true, name: true, avatar: true, lastLoginAt: true },
    where: { userId },
  }).catch(() => {});
}

export function updateRefreshToken(event: any, userId: string) {
  setCookie(event, 'refreshToken', userId, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, //  30 days
  });
}

export async function clearSessionInfo(event: any) {
  const sessionId = getSessionId(event)!;
  const session = await useSession(event, { password: sessionId });
  await session.clear();
  setCookie(event, 'sessionId', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(),
  });
  setCookie(event, 'refreshToken', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(),
  });
}

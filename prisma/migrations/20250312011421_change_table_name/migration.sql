/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectGroupMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectGroupMemberPermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskParticipantUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Permission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectGroup";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectGroupMember";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProjectGroupMemberPermission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Role";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RolePermission";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "TaskParticipantUser";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tasks";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "taskId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL DEFAULT 'WORLD_GROUP',
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "project_group" ("groupId") ON DELETE SET DEFAULT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "task_participant_user" (
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "taskId"),
    CONSTRAINT "task_participant_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "task_participant_user_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task" ("taskId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project_group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "project_group_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "project_group_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project_group_member" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "groupId"),
    CONSTRAINT "project_group_member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_group_member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "project_group" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_group_member_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role" ("roleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "project_group_member_permission" (
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "groupId"),
    CONSTRAINT "project_group_member_permission_userId_groupId_fkey" FOREIGN KEY ("userId", "groupId") REFERENCES "project_group_member" ("userId", "groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_group_member_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission" ("permissionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "role_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "role_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "permissionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "permission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "permission_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role_permission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("roleId", "permissionId"),
    CONSTRAINT "role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "role" ("roleId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "role_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission" ("permissionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_account_key" ON "user"("account");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "task_taskId_key" ON "task"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "project_group_groupId_key" ON "project_group"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "role_roleId_key" ON "role"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "permission_permissionId_key" ON "permission"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "permission_name_key" ON "permission"("name");

-- 用户插入
INSERT INTO "user" (
    "userId",
    "account",
    "name",
    "email",
    "password",
    "avatar",
    "phone",
    "createdAt",
    "updatedAt",
    "deleted"
) VALUES (
    '823db7d076224626b1857b95e0ebb6a3',
    'cmtlyt',
    'cmtlyt',
    'cmtlyt@163.com',
    '3e_FAbtDQjzIQdJlu6do26G3VhsOirVYUcar8O0SrxI',
    NULL,
    NULL,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP,
    false
);

-- 项目组插入
INSERT INTO "project_group" (
    "groupId",
    "name",
    "description",
    "creatorId",
    "updaterId",
    "updatedAt"
) VALUES (
    'WORLD_GROUP',
    '世界分组',
    '世界分组用于存放游离项目',
    '823db7d076224626b1857b95e0ebb6a3',
    '823db7d076224626b1857b95e0ebb6a3',
    CURRENT_TIMESTAMP
);
-- CreateTable
CREATE TABLE "users" (
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
CREATE TABLE "tasks" (
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
    CONSTRAINT "tasks_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ProjectGroup" ("groupId") ON DELETE SET DEFAULT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TaskParticipantUser" (
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "taskId"),
    CONSTRAINT "TaskParticipantUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TaskParticipantUser_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks" ("taskId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProjectGroup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProjectGroup_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectGroupMember" (
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "groupId"),
    CONSTRAINT "ProjectGroupMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectGroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ProjectGroup" ("groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectGroupMember_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProjectGroupMemberPermission" (
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "groupId"),
    CONSTRAINT "ProjectGroupMemberPermission_userId_groupId_fkey" FOREIGN KEY ("userId", "groupId") REFERENCES "ProjectGroupMember" ("userId", "groupId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProjectGroupMemberPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission" ("permissionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Role_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Role_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "permissionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "creatorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaterId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Permission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Permission_updaterId_fkey" FOREIGN KEY ("updaterId") REFERENCES "users" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    PRIMARY KEY ("roleId", "permissionId"),
    CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("roleId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission" ("permissionId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_account_key" ON "users"("account");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_taskId_key" ON "tasks"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectGroup_groupId_key" ON "ProjectGroup"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_roleId_key" ON "Role"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_permissionId_key" ON "Permission"("permissionId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

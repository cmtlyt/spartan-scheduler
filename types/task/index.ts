export interface Task {
  id: number;
  name: string;
  content: string;
  createdDate: string;
  creator: string;
  creatorAvatar: string;
  assignee: string;
  assigneeAvatar: string;
  status: string;
  priority: string;
  project: string;
  participants?: string[];
  updater: string;
  updatedDate: string;
}

export interface Option {
  label: string;
  value: string;
}

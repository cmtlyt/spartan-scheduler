const taskList = [
  { id: 1, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 2, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 3, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 4, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 5, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 6, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 7, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 8, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 9, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 10, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 11, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 12, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 13, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 14, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 15, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 16, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 17, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 18, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 19, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 20, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 21, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
  { id: 22, name: '任务1', content: '描述1', createdDate: '2023-10-01', updater: 'cmtlyt', updatedDate: '2023-10-10', creator: '张三', creatorAvatar: '', assignee: '李四', assigneeAvatar: '', status: '进行中', priority: '高', project: '项目A', participants: ['张三', '李四'] },
  { id: 23, name: '任务2', content: '描述2', createdDate: '2023-10-02', updater: 'cmtlyt', updatedDate: '2023-10-15', creator: '王五', creatorAvatar: '', assignee: '赵六', assigneeAvatar: '', status: '待开始', priority: '中', project: '项目B' },
  { id: 24, name: '任务3', content: '描述3', createdDate: '2023-10-03', updater: 'cmtlyt', updatedDate: '2023-10-20', creator: '孙七', creatorAvatar: '', assignee: '周八', assigneeAvatar: '', status: '已完成', priority: '低', project: '项目C', participants: ['孙七', '周八', '吴九'] },
];

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { first, size } = query;

  return {
    data: taskList.slice(Number(first), Number(first) + Number(size)),
    total: taskList.length,
  };
});

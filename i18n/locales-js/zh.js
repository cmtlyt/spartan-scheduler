export default {
  aside: {
    ybp: '仪表盘',
    xxzx: '消息中心',
    rwlb: '任务列表',
  },
  layout: {
    header: {
      logout: '退出登录',
    },
  },
  module: {
    task: {
      id: 'ID',
      name: '标题',
      content: '内容',
      status: '状态',
      priority: '优先级',
      creator: '创建人',
      assignee: '接手人',
      participants: '参与者',
      projectGroup: '所属项目',
    },
  },
  component: {
    taskInfoForm: {
      title: '创建任务',
      submit: '提交',
      requiredTip: '{label}不能为空',
      headerLabel: {
        name: '任务@:module.task.name',
        status: '任务@:module.task.status',
        priority: '@:module.task.priority',
        creator: '@:module.task.creator',
        assignee: '@:module.task.assignee',
        projectGroup: '@:module.task.projectGroup',
      },
    },
    taskDetailPanel: {
      copyId: '复制 ID',
      descTitle: '任务详情',
      editInfo: '{creator} 创建于 {createdDate}, {updater} 更新于 {updatedDate}',
      copy: {
        success: {
          title: '复制成功',
          content: '任务 ID {id} 已复制到剪贴板',
        },
        error: {
          title: '复制失败',
          content: '剪切板不可用',
        },
      },
    },
  },
  pages: {
    auth: {
      login: {
        title: '登录',
        submit: '登录',
        notAccount: '还没有账号? 去',
        success: '登录成功',
      },
      register: {
        title: '注册',
        submit: '注册',
        hasAccount: '已有账号? 去',
        success: '注册成功',
      },
      fields: {
        username: {
          label: '用户名',
          errors: {
            required: '用户名不能为空',
          },
        },
        nickname: {
          label: '昵称',
        },
        password: {
          label: '密码',
          errors: {
            required: '密码不能为空',
            lowLevel: '密码强度太弱 (至少包含字母和数字, 且长度为8-20)',
          },
        },
        confirmPassword: {
          label: '确认密码',
          errors: {
            required: '确认密码不能为空',
            lowLevel: '密码强度太弱 (至少包含字母和数字, 且长度为8-20)',
            notMatch: '两次密码不一致',
          },
        },
        email: {
          label: '邮箱',
          errors: {
            required: '邮箱不能为空',
            notEmail: '邮箱格式不正确',
          },
        },
      },
      errors: {
        loginErrorTitle: '登录失败',
        accountOrPasswordEmpty: '账号或密码不能为空',
        accountOrPasswordIncorrect: '账号或密码不正确',
        registerErrorTitle: '注册失败',
        registerField: '注册失败, 可能是账号重复?',
      },
    },
  },
};

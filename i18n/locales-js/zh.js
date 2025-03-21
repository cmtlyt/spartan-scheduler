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
      name: '标题',
      content: '内容',
      status: '状态',
      priority: '优先级',
      assignee: '接收人',
      group: '所属项目',
    },
  },
  component: {
    taskInfoForm: {
      submit: '提交',
      requiredTip: '{label}不能为空',
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

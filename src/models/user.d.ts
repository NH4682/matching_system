export type UserType = {
  id: number;
  username: string; // null comment '用户昵称',
  userAccount: string; // null comment '登录账号',
  avatarUrl: string; //null comment '用户头像',
  gender: number; // null comment '性别',
  phone: string; //null comment '电话',
  email: string; // null comment '邮箱',
  userStatus: number; // not null comment '用户状态 0 - 正常',
  role: number; // null comment '用户角色 0 - 普通用户   1 - 管理员'
  tags: string[];
  createTime: Date; //datetime default (CURRENT_TIMESTAMP) null comment '创建时间',
};

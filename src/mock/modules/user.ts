import Mock from "mockjs";

const tokens = ["admin-token", "user-token", "guest-token"];

const users = {
  "admin-token": {
    id: 1,
    name: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    roles: ["admin"],
  },
  "user-token": {
    id: 2,
    name: "User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    roles: ["user"],
  },
  "guest-token": {
    id: 3,
    name: "Guest",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=guest",
    roles: ["guest"],
  },
};

// 模拟登录接口
Mock.mock("/api/login", "post", (options: { body: string }) => {
  const { account, password } = JSON.parse(options.body);

  // 模拟账号密码验证 (admin/123456 或 user/123456)
  if ((account === "admin" || account === "user") && password === "123456") {
    const token = account === "admin" ? tokens[0] : tokens[1];
    return {
      code: "200",
      message: "登录成功",
      data: {
        token,
        userInfo: users[token as keyof typeof users],
      },
    };
  }

  return {
    code: "401",
    message: "账号或密码错误",
    data: null,
  };
});

// 模拟获取用户信息接口
Mock.mock("/api/userInfo", "get", () => {
  return {
    code: "200",
    message: "获取成功",
    data: users["admin-token"],
  };
});

// 模拟登出接口
Mock.mock("/api/logout", "post", () => {
  return {
    code: "200",
    message: "登出成功",
    data: null,
  };
});

export default Mock;

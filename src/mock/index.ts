import Mock from "mockjs";

// 设置延迟，模拟真实网络请求
Mock.setup({
  timeout: "200-500",
});

// 导入各模块的 mock
import "./modules/user";

export default Mock;

import type { Rule } from "antd/es/form/index.js";

export const requiredRule: Rule[] = [
  {
    required: true,
    message: "该字段为必填项!",
  },
];

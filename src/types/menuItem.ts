import type { MenuProps } from "antd";
import type { PageName } from "./pageName";

export type MenuItem = Required<MenuProps>["items"][number] & {
  comp?: PageName;
  children?: MenuItem[];
  label?: string;
};

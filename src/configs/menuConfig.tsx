import type { MenuItem } from "@/types/menuItem";
import {
  HomeOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  FileZipOutlined,
  EditOutlined,
} from "@ant-design/icons";

/** 侧边栏菜单 */
export const SIDER_MENU: MenuItem[] = [
  {
    label: "主页",
    icon: <HomeOutlined />,
    key: "/web/dashboard",
    comp: "dashboard",
  },
  {
    label: "图表统计",
    icon: <BarChartOutlined />,
    key: "/web/charts",
    comp: "charts",
  },
  {
    label: "嵌套菜单",
    icon: <UnorderedListOutlined />,
    key: "/web/nested",
    comp: "nestedMenu",
    children: [
      {
        label: "菜单1",
        key: "/web/nested/menu1",
        comp: "nestedMenu1",
        children: [
          {
            label: "菜单1-1",
            key: "/web/nested/menu1/menu1_1",
            comp: "nestedMenu1_1",
          },
          {
            label: "菜单1-2",
            key: "/web/nested/menu1/menu1_2",
            comp: "nestedMenu1_2",
          },
        ],
      },
      {
        label: "菜单2",
        key: "/web/nested/menu2",
        comp: "nestedMenu2",
        children: [
          {
            label: "菜单2-1",
            key: "/web/nested/menu2/menu2_1",
            comp: "nestedMenu2_1",
          },
        ],
      },
      {
        label: "菜单3",
        key: "/web/nested/menu3",
        comp: "nestedMenu3",
      },
    ],
  },
  {
    label: "文件解压缩",
    icon: <FileZipOutlined />,
    key: "/web/fileZip",
    comp: "fileZip",
  },
  {
    label: "富文本框",
    icon: <EditOutlined />,
    key: "/web/richText",
    comp: "richText",
  },
];

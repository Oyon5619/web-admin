import { SIDER_MENU } from "@/configs/menuConfig";
import { Layout, Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { useCommonStore } from "@/stores/useCommonStore";
import { useMemo } from "react";
import { getDefaultOpenSubMenuKeys } from "@/utils/routeUtils";
import styles from "./menuSider.module.less";
import { useTagListStore } from "@/stores/useTagListStore";

interface MenuSiderProps {
  urlPath?: string;
}

const DASHBOARD_KEY = "/dashboard";

export const MenuSider = ({ urlPath }: MenuSiderProps) => {
  const navigate = useNavigate();
  const { isMenuCollapsed, setIsMenuCollapsed } = useCommonStore();
  const addTagInfo = useTagListStore((state) => state.addTagInfo);

  const defaultSelectedKeys = useMemo(() => {
    return urlPath ? [urlPath] : [DASHBOARD_KEY];
  }, [urlPath]);

  const defaultOpenKeys = useMemo(() => {
    return getDefaultOpenSubMenuKeys(urlPath);
  }, [urlPath]);

  const handleSelect: MenuProps["onSelect"] = (item) => {
    const { key: menuPath } = item;
    navigate(menuPath);
    addTagInfo(menuPath);
  };

  return (
    <Layout.Sider
      theme="light"
      width={240}
      className={styles.menuSider}
      collapsed={isMenuCollapsed}
      onCollapse={setIsMenuCollapsed}
    >
      <Menu
        theme="light"
        mode="inline"
        items={SIDER_MENU}
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={defaultSelectedKeys}
        onSelect={handleSelect}
      />
    </Layout.Sider>
  );
};

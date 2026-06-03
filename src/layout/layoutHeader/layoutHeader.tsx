import { Avatar, Dropdown, Layout, Space, type MenuProps, Button } from "antd";
import logoSvg from "@/assets/images/reactLogo.svg";
import avatarImg from "@/assets/images/avatar.png";
import styles from "./layoutHeader.module.less";
import { useCommonStore } from "@/stores/useCommonStore";
import { useUserStore } from "@/stores/useUserStore";
import { useThemeStore } from "@/stores/useThemeStore";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { RightMenuDrawer } from "../rightMenuDrawer/rightMenuDrawer";
import { useLogout } from "@/hooks/useLogout";
import classNames from "classnames";

export const LayoutHeader = () => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>();
  const [showMode, setShowMode] = useState<string>();
  const { isMenuCollapsed, setIsMenuCollapsed } = useCommonStore();
  const userInfo = useUserStore((state) => state.userInfo);
  const { logout } = useLogout();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  const handleSelect: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      logout();
      return;
    }

    setShowMode(key);
    setIsShowDrawer(true);
  };

  return (
    <Layout.Header
      className={classNames(styles.layoutHeader, {
        [styles.darkMode]: isDarkMode,
      })}
    >
      <img
        src={logoSvg}
        className={styles.logo}
        alt="logo"
        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
      />
      <div className={styles.title}>Web Admin</div>
      <Space className={styles.rightMenu}>
        <Button
          type="text"
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleDarkMode}
        />
        <Dropdown
          menu={{
            onClick: handleSelect,
            items: [
              { key: "settings", label: "系统设置", icon: <SettingOutlined /> },
              { key: "profile", label: "个人档案", icon: <UserOutlined /> },
              { type: "divider" },
              {
                key: "logout",
                label: "注销",
                icon: <LogoutOutlined />,
                danger: true,
              },
            ],
          }}
        >
          <Avatar
            icon={<img src={userInfo?.avatar || avatarImg} />}
            size="medium"
          />
        </Dropdown>
      </Space>
      {isShowDrawer && (
        <RightMenuDrawer
          showMode={showMode}
          open={isShowDrawer}
          onClose={() => setIsShowDrawer(false)}
        />
      )}
    </Layout.Header>
  );
};

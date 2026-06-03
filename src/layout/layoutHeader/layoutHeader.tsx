import { Avatar, Dropdown, Layout, Space, type MenuProps } from "antd";
import logoSvg from "@/assets/images/reactLogo.svg";
import avatarImg from "@/assets/images/avatar.png";
import styles from "./layoutHeader.module.less";
import { useCommonStore } from "@/stores/useCommonStore";
import { useUserStore } from "@/stores/useUserStore";
import { useLogout } from "@/hooks/useLogout";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { RightMenuDrawer } from "../rightMenuDrawer/rightMenuDrawer";

export const LayoutHeader = () => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>();
  const [showMode, setShowMode] = useState<string>();
  const { isMenuCollapsed, setIsMenuCollapsed } = useCommonStore();
  const userInfo = useUserStore((state) => state.userInfo);
  const { logout } = useLogout();

  const handleSelect: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      logout();
      return;
    }

    setShowMode(key);
    setIsShowDrawer(true);
  };

  return (
    <Layout.Header className={styles.layoutHeader}>
      <img
        src={logoSvg}
        className={styles.logo}
        alt="logo"
        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
      />
      <div className={styles.title}>Web Admin</div>
      <Space className={styles.rightMenu}>
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

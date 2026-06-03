import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./layout.module.less";
import { MenuSider } from "./menuSider/menuSider";
import { LayoutHeader } from "./layoutHeader/layoutHeader";
import { NavigateView } from "./navigateView/navigateView";

export const LayoutPage = () => {
  const { pathname: urlPath } = useLocation();

  return (
    <Layout className={styles.layoutContainer}>
      <MenuSider urlPath={urlPath} />
      <Layout>
        <LayoutHeader />
        <NavigateView urlPath={urlPath} mode="tagList" />
        <Layout.Content className={styles.contentBox}>
          <div className={styles.contentInner}>
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

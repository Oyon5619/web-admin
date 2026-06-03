import { Breadcrumb } from "antd";
import styles from "./navigateVirew.module.less";
import { useEffect, useMemo } from "react";
import { getBreadCrumbItemsByUrlPath } from "@/utils/routeUtils";
import { useCommonStore } from "@/stores/useCommonStore";
import { Link, useNavigate } from "react-router-dom";
import { SLASH } from "@/constants/commonStrings";
import { TagList } from "./tagList";
import { useTagListStore } from "@/stores/useTagListStore";
import { useThemeStore } from "@/stores/useThemeStore";
import classNames from "classnames";

interface NavigateViewProps {
  mode?: "breadCrumb" | "tagList";
  urlPath?: string;
}

export const NavigateView = ({
  mode = "breadCrumb",
  urlPath,
}: NavigateViewProps) => {
  const navigate = useNavigate();
  const isHashRoute = useCommonStore((state) => state.isHashRoute);
  const { tagList, activeKey, setActiveKey, addTagInfo, removeTagInfo } =
    useTagListStore();

  const breadCrumbItems = useMemo(() => {
    return getBreadCrumbItemsByUrlPath(urlPath, isHashRoute);
  }, [urlPath, isHashRoute]);

  useEffect(() => {
    addTagInfo(urlPath);
  }, [urlPath]);

  const handleTagClick = (path?: string) => {
    setActiveKey(path);
    navigate(path ?? "");
  };

  const handleTagRemove = (path?: string) => {
    removeTagInfo(path, (newActiveKey) => {
      navigate(newActiveKey ?? SLASH);
    });
  };

  const viewRender = () => {
    // 面包屑模式
    if (mode === "breadCrumb") {
      return (
        <Breadcrumb
          items={breadCrumbItems}
          itemRender={
            !isHashRoute
              ? (route, _params, items, paths) => {
                  const isLast = route.path === items.at(-1)?.path;
                  if (isLast) {
                    return <span>{route.title}</span>;
                  }

                  return (
                    <Link to={`${SLASH}${paths.join(SLASH)}`}>
                      {route.title}
                    </Link>
                  );
                }
              : undefined
          }
        />
      );
    }

    // 页面标签列表模式
    return (
      <TagList
        list={tagList}
        activeKey={activeKey}
        onClick={handleTagClick}
        onClose={handleTagRemove}
      />
    );
  };

  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={classNames(styles.navigateViewBox, {
        [styles.darkMode]: isDarkMode,
      })}
    >
      {viewRender()}
    </div>
  );
};

import type { TagInfo } from "@/types/tagInfo";
import { Space, Tag } from "antd";
import classNames from "classnames";
import styles from "./navigateVirew.module.less";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useThemeStore } from "@/stores/useThemeStore";

interface TagListProps {
  list: TagInfo[];
  activeKey?: string;
  onClose: (path?: string) => void;
  onClick: (path?: string) => void;
}

export const TagList = ({
  list,
  activeKey,
  onClick,
  onClose,
}: TagListProps) => {
  const primaryColor = useThemeStore((state) => state.themeConfig.token?.colorPrimary);

  return (
    <Space className={styles.tagList}>
      {list.map((item) => {
        const { title, path } = item;
        const isActive = path === activeKey;
        return (
          <Tag
            className={classNames(styles.tagInfo, {
              [styles.activeTag]: isActive,
            })}
            key={path}
            variant={"outlined"}
            color={isActive ? primaryColor : undefined}
            style={isActive ? { borderColor: primaryColor, color: primaryColor } : undefined}
            closeIcon={<CloseCircleOutlined className={styles.closeIcon} />}
            closable={list.length > 1}
            onClick={() => onClick(path)}
            onClose={() => onClose(path)}
          >
            {title}
          </Tag>
        );
      })}
    </Space>
  );
};

import type { ReactNode } from "react";
import styles from "./nestedComp.module.less";

interface NestedCompProps {
  level: 1 | 2 | 3;
  pageTitle?: string;
  children?: ReactNode;
}

const LEVEL_STYLE_MAP: Record<number, string> = {
  1: styles.level_1,
  2: styles.level_2,
  3: styles.level_3,
};

export const NestedComp = ({ level, pageTitle, children }: NestedCompProps) => {
  return (
    <div className={LEVEL_STYLE_MAP[level]}>
      {pageTitle}
      {children}
    </div>
  );
};

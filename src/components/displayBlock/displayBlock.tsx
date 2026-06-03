import classNames from "classnames";
import styles from "./displayBlock.module.less";
import type { CSSProperties, ReactNode } from "react";

interface DisplayBlockProps {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

export const DisplayBlock = (props: DisplayBlockProps) => {
  const { children, className, style } = props;

  return (
    <div className={classNames(styles.displayBlock, className)} style={style}>
      {children}
    </div>
  );
};

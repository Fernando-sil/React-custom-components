import { CSSProperties, HTMLAttributes } from "react";
import styles from "./ToolTip.module.css";

type ToolTipProps = {
  text: string;
  color: string;
} & HTMLAttributes<HTMLDivElement>;

export interface CustomCSS extends CSSProperties {
  "--color": string;
}

function ToolTip({ text, color, ...props }: ToolTipProps) {
  return (
    <div
      data-text={text}
      style={{ "--color": color } as CustomCSS}
      className={styles.tooltip__container}
      {...props}
    ></div>
  );
}

export { ToolTip };

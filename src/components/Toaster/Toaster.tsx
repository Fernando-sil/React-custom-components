import { cva, VariantProps } from "cva";
import { createContext, HTMLAttributes, useContext } from "react";
import styles from "./Toaster.module.css";
import { FaCheck } from "react-icons/fa";
import { ToastContext } from "./ToastProvider";
import { IoClose, IoWarningOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

const icons = {
  success: {
    icon: <FaCheck />,
    style: `${styles.toaster__icon} ${styles.toaster__icon_success}`,
  },
  warning: {
    icon: <IoWarningOutline />,
    style: `${styles.toaster__icon} ${styles.toaster__icon_warning}`,
  },
  fail: {
    icon: <IoClose />,
    style: `${styles.toaster__icon} ${styles.toaster__icon_fail}`,
  },
  custom: {
    icon: <IoMdNotificationsOutline />,
    style: `${styles.toaster__icon} ${styles.toaster__icon_custom}`,
  },
};

const tagStyle = {
  success: `${styles.toaster__tag} ${styles.toaster__tag_success}`,
  warning: `${styles.toaster__tag} ${styles.toaster__tag_warning}`,
  fail: `${styles.toaster__tag} ${styles.toaster__tag_fail}`,
  custom: `${styles.toaster__tag} ${styles.toaster__tag_custom}`,
};

const ToastStyles = cva(styles.toaster__body, {
  variants: {
    variant: {
      success: styles.toaster__body_success,
      warning: styles.toaster__body_warning,
      fail: styles.toaster__body_fail,
      custom: "",
    },
  },
});

type TVariant = "success" | "warning" | "fail" | "custom" | null | undefined;

type TContext = {
  variant: TVariant;
};

const ToasterContext = createContext<TContext>({
  variant: null,
});

export interface IToast
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ToastStyles> {}

type TToast = {
  variant: TVariant;
} & HTMLAttributes<HTMLDivElement>;

type TTitle = {
  toastId: number;
} & HTMLAttributes<HTMLParagraphElement>;

function Toast({ className, variant, children, ...props }: TToast) {
  const tag = tagStyle[variant!];
  return (
    <ToasterContext.Provider value={{ variant }}>
      <div className={`${styles.toaster} ${className}`} {...props}>
        <div className={tag}></div>
        {children}
      </div>
    </ToasterContext.Provider>
  );
}

function ToastTitle({ className, toastId, ...props }: TTitle) {
  const { closeToast } = useContext(ToastContext);
  return (
    <div className={styles.toaster__title}>
      <p className={`${styles.toaster__title} ${className}`} {...props}></p>
      <IoClose onClick={() => closeToast(toastId)} />
    </div>
  );
}

function ToastBody({ children, className, ...props }: IToast) {
  const { variant } = useContext(ToasterContext);
  const iconVariant = icons[variant!];
  return (
    <div className={ToastStyles({ variant, className })} {...props}>
      <div className={iconVariant.style}>{iconVariant.icon}</div>
      <div>{children}</div>
    </div>
  );
}

export { Toast, ToastBody, ToastTitle };

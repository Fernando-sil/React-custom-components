import { CSSProperties, useRef, useState } from "react";

export type TStyles = {
  toastStyles?: CSSProperties;
  titleStyles?: CSSProperties;
  bodyStyles?: CSSProperties;
} | null;
type TToast = {
  id: number;
  message: string;
  title: string;
  variant: "success" | "fail" | "warning" | "custom";
  styles?: TStyles;
};

export function useToaster() {
  const timeRef = useRef<number>(0);
  const [toasts, setToasts] = useState<TToast[]>([]);
  const [timePassed, setTimePassed] = useState(0);

  function createToastObject(
    message: string,
    title: string,
    variant: "success" | "fail" | "warning" | "custom",
    styles?: TStyles
  ): TToast {
    return {
      id: Date.now(),
      message: message,
      title: title,
      variant: variant,
      styles: styles,
    };
  }

  function showToast(message: string, title: string, styles: TStyles = null) {
    const newToast = createToastObject(message, title, "custom", styles);
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }

  function showToastSuccess(message: string) {
    const newToast = createToastObject(message, "Success", "success");
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }
  function showToastFail(message: string) {
    const newToast = createToastObject(message, "Fail", "fail");
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }
  function showToastWarning(message: string) {
    const newToast = createToastObject(message, "Warning", "warning");
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }

  function closeToast(id: number) {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id)
    );
  }

  return {
    timeRef,
    toasts,
    setToasts,
    timePassed,
    setTimePassed,
    closeToast,
    showToast,
    showToastFail,
    showToastSuccess,
    showToastWarning,
  };
}

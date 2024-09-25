import { createContext, useEffect, useState } from "react";
import { Toast, ToastBody, ToastTitle } from "./Toaster";
import styles from "./Toaster.module.css";
import { TStyles, useToaster } from "./toasterHook";

type Tcontext = {
  showToast: (message: string, title: string, styles?: TStyles) => void;
  showToastSuccess: (message: string) => void;
  showToastFail: (message: string) => void;
  closeToast: (id: number) => void;
};

export const ToastContext = createContext<Tcontext>({
  showToast: () => null,
  showToastSuccess: () => null,
  showToastFail: () => null,
  closeToast: () => null,
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const {
    timeRef,
    setTimePassed,
    timePassed,
    toasts,
    showToast,
    showToastFail,
    showToastSuccess,
    closeToast,
  } = useToaster();
  const [hover, setHover] = useState(false);
  const toastLength = toasts.length;

  const start = Date.now();
  useEffect(() => {
    if (toastLength === 0) return;
    if (timePassed !== 0) return;
    timeRef.current = setInterval(() => {
      closeToast(toasts[0].id);
    }, 3000);

    return () => clearInterval(timeRef.current);
  }, [toasts, toastLength, timePassed, closeToast, timeRef]);

  useEffect(() => {
    if (!hover) return;
    const timeInterval = timePassed < 3000 ? 3000 - timePassed : timePassed;
    const interval = setInterval(() => {
      toasts.map((toast) => closeToast(toast.id));
    }, timeInterval);

    return () => {
      clearInterval(interval);
      setTimePassed(0);
      setHover(false);
    };
  }, [toasts, timePassed, closeToast, setTimePassed, hover]);

  return (
    <ToastContext.Provider
      value={{ showToast, closeToast, showToastSuccess, showToastFail }}
    >
      {children}
      <div
        className={styles.wrapper}
        onMouseEnter={() => {
          clearInterval(timeRef.current);

          setTimePassed(Date.now() - start);
        }}
        onMouseLeave={() => setHover(true)}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            style={toast.styles?.toastStyles}
          >
            <ToastTitle toastId={toast.id} style={toast.styles?.titleStyles}>
              {toast.title}
            </ToastTitle>
            <ToastBody style={toast.styles?.bodyStyles}>
              {toast.message}
            </ToastBody>
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

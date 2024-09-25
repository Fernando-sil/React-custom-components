import { cva, VariantProps } from "cva";
import {
  createContext,
  DialogHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  HtmlHTMLAttributes,
  useContext,
} from "react";
import { useModal } from "./modalHook";
import Button from "../Button/Button";
import styles from "./Modal.module.css";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

const variant = {
  primary: styles.dialog_primary,
  secondary: styles.dialog_secondary,
  accent: styles.dialog_accent,
};

const colors = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  accent: "var(--color-accent)",
};

const ModalStyles = cva(styles.dialog, {
  variants: {
    variant: variant,
    size: {
      small: styles.dialog_small,
      medium: styles.dialog_medium,
      large: styles.dialog_large,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "small",
  },
});

export interface ModalProps
  extends DialogHTMLAttributes<HTMLDialogElement>,
    VariantProps<typeof ModalStyles> {}

type TModalContext = {
  dialogRef: React.RefObject<HTMLDialogElement> | null;
  ToggleDialog: () => void;
};

const ModalContext = createContext<TModalContext>({
  dialogRef: null,
  ToggleDialog: () => null,
});

type TVariantContext = {
  variant: keyof typeof variant | null | undefined;
};

const VarianteContext = createContext<TVariantContext>({ variant: null });

function SelectVariant() {
  const { variant } = useContext(VarianteContext);
  return variant === null || variant === undefined ? "primary" : variant;
}

function Modal({ ...props }: HtmlHTMLAttributes<HTMLDivElement>) {
  const { dialogRef, ToggleDialog } = useModal();
  return (
    <ModalContext.Provider value={{ dialogRef, ToggleDialog }}>
      <div className={styles.wrapper} {...props}></div>
    </ModalContext.Provider>
  );
}

const ModalBody = ({ className, children, variant, ...props }: ModalProps) => {
  const { dialogRef, ToggleDialog } = useContext(ModalContext);
  return (
    <VarianteContext.Provider value={{ variant }}>
      <dialog
        className={ModalStyles({ variant, className })}
        onClick={(e) => {
          if (e.target === e.currentTarget) return ToggleDialog();
        }}
        ref={dialogRef}
        {...props}
      >
        <IconContext.Provider value={{ size: "30" }}>
          <IoClose onClick={ToggleDialog} className={styles.close_icon} />
        </IconContext.Provider>
        <div className={`${styles.modal__body}`}>{children}</div>
      </dialog>
    </VarianteContext.Provider>
  );
};
const ModalTrigger = forwardRef<
  HTMLDivElement,
  HtmlHTMLAttributes<HTMLDivElement>
>(({ children, ...props }: HtmlHTMLAttributes<HTMLDivElement>, ref) => {
  const { ToggleDialog } = useContext(ModalContext);
  return (
    <div
      onClick={ToggleDialog}
      style={{ width: "fit-content" }}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

function ModalHeading({ ...props }: HtmlHTMLAttributes<HTMLDivElement>) {
  const selectedVariant = SelectVariant();
  return (
    <div
      className={styles.modal__heading}
      style={{ borderBottom: `2px solid ${colors[selectedVariant]}` }}
      {...props}
    ></div>
  );
}

function ModalTitle({ ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={styles.modal_title} {...props}></h2>;
}

function ModalContent({
  className,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
  return <div className={`${className}`} {...props}></div>;
}

function ModalFooter({ ...props }: HtmlHTMLAttributes<HTMLDivElement>) {
  const selectedVariant = SelectVariant();
  return (
    <div
      className={styles.modal__footer}
      style={{ borderTop: `2px solid ${colors[selectedVariant]}` }}
      {...props}
    ></div>
  );
}

function ModalCloseButton() {
  const { ToggleDialog } = useContext(ModalContext);
  return <Button onClick={ToggleDialog}>Close</Button>;
}

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalTitle,
  ModalHeading,
  ModalFooter,
};

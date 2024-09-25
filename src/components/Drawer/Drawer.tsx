import { cva, VariantProps } from "cva";
import { createContext, forwardRef, HTMLAttributes, useContext } from "react";
import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";
import styles from "./Drawer.module.css";
import { useDrawer } from "./DrawerHook";
import ReactDOM from "react-dom";

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
};
const orientations = {
  horizontal: styles.orientation_horizontal,
  vertical: styles.orientation_vertical,
};
const drawerVariants = {
  variant: variants,
  orientation: orientations,
};

const drawerOpenState = {
  horizontal: styles.drawer__open_horizontal,
  vertical: styles.drawer__open_vertical,
};

const drawerStyles = cva(styles.drawer, {
  variants: drawerVariants,
  defaultVariants: {
    variant: "primary",
    orientation: "horizontal",
  },
});

export interface DrawerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof drawerStyles> {}

type TDrawerContext = {
  open: boolean | null | undefined;
  variant: keyof typeof variants | null | undefined;
  orientation: keyof typeof orientations | null | undefined;
  toggleDrawer: () => void;
};

const DrawerContext = createContext<TDrawerContext>({
  open: false,
  toggleDrawer: () => null,
  variant: null,
  orientation: null,
});

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ variant, orientation, ...props }: DrawerProps, ref) => {
    const { toggleDrawer, open } = useDrawer();
    return (
      <DrawerContext.Provider
        value={{ open, toggleDrawer, orientation, variant }}
      >
        <div ref={ref} {...props}></div>
      </DrawerContext.Provider>
    );
  }
);

function DrawerTrigger({ children }: { children: React.ReactNode }) {
  const { toggleDrawer } = useContext(DrawerContext);
  return (
    <>
      <div style={{ width: "fit-content" }} onClick={toggleDrawer}>
        {children}
      </div>
    </>
  );
}

const DrawerContent = forwardRef<HTMLDivElement, DrawerProps>(
  ({ className, children, ...props }: DrawerProps, ref) => {
    const { open, toggleDrawer, variant, orientation } =
      useContext(DrawerContext);
    const drawerVariant =
      variant === null || variant === undefined ? "primary" : variant;
    const drawerOrientation =
      orientation === null || orientation === undefined
        ? "horizontal"
        : orientation;
    return ReactDOM.createPortal(
      <>
        <div
          className={`${drawerStyles({ variant, orientation, className })} ${
            variants[drawerVariant]
          } ${orientations[drawerOrientation]} ${
            open ? drawerOpenState[drawerOrientation] : ""
          }`}
          ref={ref}
          {...props}
        >
          <IconContext.Provider
            value={{ size: "30", style: { display: "block" } }}
          >
            <IoClose onClick={toggleDrawer} className={styles.close_icon} />
          </IconContext.Provider>
          {children}
        </div>
        <div
          onClick={toggleDrawer}
          className={`${styles.overlay} ${open ? styles.overlay_visible : ""}`}
        ></div>
      </>,
      document.getElementById("root")!
    );
  }
);

function DrawerContentTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`${styles.drawer__content_title} ${className}`}
      {...props}
    ></h2>
  );
}

function DrawerContentBody({ className, ...props }: DrawerProps) {
  return (
    <div
      className={`${styles.drawer__content_body} ${className}`}
      {...props}
    ></div>
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerContentBody,
  DrawerContentTitle,
};

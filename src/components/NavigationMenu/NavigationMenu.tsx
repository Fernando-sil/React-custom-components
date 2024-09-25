import { cva, VariantProps } from "cva";
import {
  createContext,
  HTMLAttributes,
  HtmlHTMLAttributes,
  useContext,
} from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./NavigationMenu.module.css";

const variant = {
  primary: styles.navigation_menu_primary,
  secondary: styles.navigation_menu_secondary,
  accent: styles.navigation_menu_accent,
};
const bodyVariant = {
  primary: styles.navigation_menu__body_primary,
  secondary: styles.navigation_menu__body_secondary,
  accent: styles.navigation_menu__body_accent,
};

const NavigationStyles = cva(styles.navigation_menu, {
  variants: {
    variant: variant,
  },
  defaultVariants: {
    variant: "primary",
  },
});

type NavigationMenuContextProps = {
  variant: keyof typeof variant | null | undefined;
};

const NavigationMenuContext = createContext<NavigationMenuContextProps>({
  variant: null,
});

export interface NavigationProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof NavigationStyles> {}

type TNavigationMenu = {
  label: string;
} & NavigationProps;

function NavigationMenu({
  children,
  className,
  label,
  variant,
  ...props
}: TNavigationMenu) {
  return (
    <NavigationMenuContext.Provider value={{ variant }}>
      <div
        data-state="closed"
        className={NavigationStyles({ variant, className })}
        onMouseOver={(e) => {
          if (e.currentTarget.getAttribute("data-state") === "open") return;
          e.currentTarget.setAttribute("data-state", "open");
        }}
        onMouseOut={(e) => {
          e.currentTarget.setAttribute("data-state", "closed");
        }}
        onClick={(e) => {
          if (e.currentTarget.getAttribute("data-state") === "open") {
            e.currentTarget.setAttribute("data-state", "closed");
          } else {
            e.currentTarget.setAttribute("data-state", "open");
          }
        }}
        {...props}
      >
        {label}
        <div className={styles.overlay}></div>
        {children}
        <IoIosArrowDown />
      </div>
    </NavigationMenuContext.Provider>
  );
}

function NavigationMenuBody({
  children,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
  const { variant } = useContext(NavigationMenuContext);
  const selectedVariant =
    variant === null || variant === undefined ? "primary" : variant;
  return (
    <div
      id="submenu"
      className={`${styles.navigation_menu__body} ${bodyVariant[selectedVariant]}`}
      {...props}
    >
      <div className={styles.navigation_menu__content}>{children}</div>
    </div>
  );
}

export { NavigationMenu, NavigationMenuBody };

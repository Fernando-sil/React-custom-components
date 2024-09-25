import { cva, VariantProps } from "cva";
import {
  createContext,
  forwardRef,
  HTMLAttributes,
  HtmlHTMLAttributes,
  useContext,
} from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import styles from "./SideMenu.module.css";
import { IconContext } from "react-icons";

const navColors = {
  primary: styles.primary,
  secondary: styles.secondary,
};

const NavStyles = cva(styles.nav, {
  variants: {
    variant: navColors,
  },
  defaultVariants: {
    variant: "primary",
  },
});

type TContext = {
  variant: keyof typeof navColors | null | undefined;
};

const NavContext = createContext<TContext>({ variant: null });

export interface NavProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof NavStyles> {}

const SideMenu = forwardRef<HTMLElement, NavProps>(
  ({ variant, children, className, ...props }: NavProps, ref) => {
    return (
      <NavContext.Provider value={{ variant }}>
        <nav className={NavStyles({ variant, className })} ref={ref} {...props}>
          <input type="checkbox" id="sideBar" className={styles.sideBar} />
          <label htmlFor="sideBar" className={styles.overlay}></label>
          <label htmlFor="sideBar" className={styles.label}>
            <IconContext.Provider
              value={{ size: "30", className: `${styles.react_icon}` }}
            >
              <FiMenu />
            </IconContext.Provider>
          </label>
          {children}
        </nav>
      </NavContext.Provider>
    );
  }
);

function SideMenuBody({
  children,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) {
  const { variant } = useContext(NavContext);
  const bodyColor =
    variant === undefined || variant === null
      ? styles.primary
      : navColors[variant];

  return (
    <div className={`${styles.nav__body} ${bodyColor}`} {...props}>
      <label htmlFor="sideBar" className={styles.label}>
        <IconContext.Provider
          value={{ size: "30", className: `${styles.react_icon}` }}
        >
          <IoClose />
        </IconContext.Provider>
      </label>

      {children}
    </div>
  );
}

export { SideMenu, SideMenuBody };

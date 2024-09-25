import { cva, VariantProps } from "cva";
import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

const buttonStyle = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      outline: styles.outline,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
      large: styles.large,
      variable: styles.variable,
      full: styles.full,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyle> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={buttonStyle({ variant, size, className })}
        ref={ref}
        {...props}
      ></button>
    );
  }
);

export default Button;

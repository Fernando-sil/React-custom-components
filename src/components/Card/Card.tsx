import { cva, VariantProps } from "cva";
import { HTMLAttributes } from "react";
import styles from "./Card.module.css";

const CardStyles = cva(styles.card, {
  variants: {
    variant: {
      primary: styles.card_primary,
      secondary: styles.card_secondary,
      accent: styles.card_accent,
      outline: styles.card_outline,
      outlineDark: styles.card_outlineDark,
      custom: "",
    },
    size: {
      small: styles.card_small,
      medium: styles.card_medium,
      large: styles.card_large,
      fit: styles.card_fit,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type TSection = HTMLAttributes<HTMLDivElement>;

export interface ICard extends TSection, VariantProps<typeof CardStyles> {}

function Card({ className, variant, size, ...props }: ICard) {
  return (
    <div className={CardStyles({ variant, size, className })} {...props}></div>
  );
}

function CardHeader({ className, ...props }: TSection) {
  return (
    <div className={`${styles.card__header} ${className}`} {...props}></div>
  );
}

function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`${styles.card__title} ${className}`} {...props}></h3>;
}

function CardContent({ className, ...props }: ICard) {
  return (
    <div className={`${styles.card__content} ${className}`} {...props}></div>
  );
}

function CardFooter({ className, ...props }: ICard) {
  return (
    <div className={`${styles.card__footer} ${className}`} {...props}></div>
  );
}

export { Card, CardContent, CardHeader, CardTitle, CardFooter };

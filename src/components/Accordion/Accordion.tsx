import { cva, VariantProps } from "cva";
import { HTMLAttributes } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./Accordion.module.css";

const variant = {
  primary: `${styles.accordion} ${styles.accordion_primary}`,
  secondary: `${styles.accordion} ${styles.accordion_secondary}`,
  accent: `${styles.accordion} ${styles.accordion_accent}`,
};

const AccordionStyles = cva(styles.accordion2, {
  variants: {
    variant: variant,
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface IAccordion
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AccordionStyles> {}

function Accordion2({ variant, className, ...props }: IAccordion) {
  return (
    <>
      <input id="accordion" type="checkbox" className={styles.checkBox} />

      <div className={AccordionStyles({ variant, className })} {...props}></div>
    </>
  );
}

function Accordion2Label({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <label htmlFor="accordion">
      <div className={styles.accordion__label} {...props}>
        {children}
        <IoIosArrowDown />
      </div>
    </label>
  );
}

function Accordion2Content({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styles.accordion__content} {...props}>
      <div>{children}</div>
    </div>
  );
}

export { Accordion2, Accordion2Label, Accordion2Content };

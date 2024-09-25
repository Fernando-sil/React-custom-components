import { cva, VariantProps } from "cva";
import { forwardRef, HTMLAttributes } from "react";
import styles from "./Carousel.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useIndex } from "./CarouselHook";
import React from "react";

const variants = {
  primary: `4px solid var(--color-primary)`,
  secondary: `4px solid var(--color-secondary)`,
  accent: `4px solid var(--color-accent)`,
};

const sizes = {
  small: styles.carousel_size_small,
  medium: styles.carousel_size_medium,
  large: styles.carousel_size_large,
};

const leftArrowStyle = {
  primary: styles.carousel_primary_left,
  secondary: styles.carousel_secondary_left,
  accent: styles.carousel_accent_left,
};
const rightArrowStyle = {
  primary: styles.carousel_primary_right,
  secondary: styles.carousel_secondary_right,
  accent: styles.carousel_accent_right,
};

const CarouselStyles = cva(styles.carousel, {
  variants: {
    variant: variants,
    size: sizes,
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export interface IProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CarouselStyles> {}

type CarouselProps = IProps & { children: React.ReactNode[] };

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, variant, size, children, ...props }: CarouselProps, ref) => {
    const { index, IncreaseIndex, DecreaseIndex, SetIndex } = useIndex();
    const selectedVariant =
      variant === null || variant === undefined ? "primary" : variant;
    const childrenCount = React.Children.count(children);
    return (
      <div className={styles.wrapper}>
        <div
          className={`${styles.carousel_left} ${leftArrowStyle[selectedVariant]}`}
        >
          <IconContext.Provider value={{ size: "30" }}>
            <FaAngleLeft onClick={() => DecreaseIndex(childrenCount)} />
          </IconContext.Provider>
        </div>
        <div
          className={`${styles.carousel_right} ${rightArrowStyle[selectedVariant]}`}
        >
          <IconContext.Provider value={{ size: "30" }}>
            <FaAngleRight onClick={() => IncreaseIndex(childrenCount)} />
          </IconContext.Provider>
        </div>
        <div
          className={CarouselStyles({ variant, size, className })}
          ref={ref}
          {...props}
        >
          {children.map((child, currentIndex) => (
            <div
              key={currentIndex}
              className={styles.carousel__container}
              aria-hidden={currentIndex !== index}
              style={{
                border: `${variants[selectedVariant]}`,
                translate: `${-102.176 * index}%`,
              }}
            >
              {child}
            </div>
          ))}
        </div>
        <div className={styles.carousel__selector}>
          {Array.from({ length: childrenCount }, (_, i) => (
            <div
              key={i}
              className={`${styles.carousel__selector_item} ${
                index === i ? styles.carousel__selector_item_active : ""
              }`}
              onClick={() => SetIndex(i)}
            ></div>
          ))}
        </div>
      </div>
    );
  }
);

export { Carousel };

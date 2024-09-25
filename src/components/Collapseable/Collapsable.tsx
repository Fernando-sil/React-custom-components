import { cva, VariantProps } from "cva";
import { HTMLAttributes } from "react";
import styles from "./Collapseable.module.css";

const CollapseableStyles = cva(styles.collapseable__content, {
  variants: {
    variant: {
      primary: styles.collapseable__content_primary,
      secondary: styles.collapseable__content_secondary,
      accent: styles.collapseable__content_accent,
    },
    position: {
      left: styles.collapseable__content_left,
      right: styles.collapseable__content_right,
    },
  },
  defaultVariants: {
    variant: "primary",
    position: "right",
  },
});

export interface ICollapseable
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof CollapseableStyles> {}

function Collapseable({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={styles.collapseable} {...props}></div>;
}

function CollapseableSummary({
  id,
  children,
  ...props
}: HTMLAttributes<HTMLLabelElement>) {
  return (
    <>
      <input type="checkbox" id={id} className={styles.checkBox} />
      <label htmlFor={id} className={styles.overlay}></label>
      <label
        className={styles.label}
        id="label"
        htmlFor={id}
        {...props}
        // style={{
        //   cursor: "pointer",
        //   backgroundColor: "red",
        // }}
      >
        {children}
      </label>
    </>
  );
}

function CollapseableContent({ variant, className, ...props }: ICollapseable) {
  return (
    <ul className={CollapseableStyles({ variant, className })} {...props}></ul>
  );
}

export { Collapseable, CollapseableContent, CollapseableSummary };
// export interface ICollapseable
//   extends HTMLAttributes<HTMLDetailsElement>,
//     VariantProps<typeof CollapseableStyles> {}

// function Collapseable({ ...props }: ICollapseable) {
//   return (
//     <details
//       //   onClick={(e) => {
//       //     const tags = e.currentTarget.getElementsByTagName("details");
//       //     console.log(e.target);
//       //     console.log(e.currentTarget.getElementsByTagName("details"));
//       //     // console.log(e.target);

//       //     if (tags.length === 0) return;

//       //     for (let i = 0; i < tags.length; i++) {
//       //       if (tags[i].hasAttribute("open")) tags[i].removeAttribute("open");
//       //       //   if (e.target === tags[i]) console.log("found");
//       //     }
//       //   }}
//       className={styles.collapseable}
//       {...props}
//     ></details>
//   );
// }

// function CollapseableSummary({ ...props }: HTMLAttributes<HTMLElement>) {
//   return <summary {...props}></summary>;
// }

// function CollapseableContent({ ...props }: HTMLAttributes<HTMLUListElement>) {
//   return (
//     <ul
//       //   onClick={(e) => {
//       //     const tags = e.currentTarget.getElementsByTagName("summary");
//       //     if (e.target === tags[0]) console.log("found");
//       //     // for (let i = 0; i < tags.length; i++) {
//       //     //   if (tags[i].getAttribute("class") == styles.collapseable)
//       //     //     console.log(tags[i]);
//       //     // }

//       //     // console.log(e.currentTarget.childNodes[2].childNodes[0]);
//       //   }}
//       className={styles.collapseable__content}
//       {...props}
//     ></ul>
//   );
// }

// export { Collapseable, CollapseableContent, CollapseableSummary };

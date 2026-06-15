import { type ElementType, type ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3" | "div" | "span";

const alignClass = {
  left: "scroll-scale-heading scroll-scale-heading--left",
  center: "scroll-scale-heading scroll-scale-heading--center",
  right: "scroll-scale-heading scroll-scale-heading--right",
} as const;

type ScrollScaleHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: HeadingTag;
  align?: keyof typeof alignClass;
};

export default function ScrollScaleHeading({
  children,
  className = "",
  as: Tag = "div",
  align = "left",
}: ScrollScaleHeadingProps) {
  const Component = Tag as ElementType;

  return (
    <Component className={`${alignClass[align]} ${className}`.trim()}>
      {children}
    </Component>
  );
}

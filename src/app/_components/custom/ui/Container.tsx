import React from "react";

type FlexDirection =
  | "column"
  | "inherit"
  | "-moz-initial"
  | "initial"
  | "revert"
  | "unset"
  | "column-reverse"
  | "row"
  | "row-reverse"
  | undefined;

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";

export default function Container({
  children,
  width = "100%",
  direction = "row",
  gap = "6px",
  justify = "center",
}: {
  children: React.ReactNode;
  width?: string;
  direction?: FlexDirection | undefined;
  gap?: string;
  justify?: JustifyContent;
}) {
  return (
    <div
      className="flex items-start rounded-lg bg-white p-3"
      style={{
        width: width,
        flexDirection: direction,
        gap: gap,
        justifyContent: justify,
      }}
    >
      {children}
    </div>
  );
}

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

export default function Container({
  children,
  width = "100%",
  direction = "row",
  gap = "6px",
}: {
  children: React.ReactNode;
  width?: string;
  direction?: FlexDirection | undefined;
  gap?: string;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-lg bg-white p-3"
      style={{
        width: width,
        flexDirection: direction,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
}

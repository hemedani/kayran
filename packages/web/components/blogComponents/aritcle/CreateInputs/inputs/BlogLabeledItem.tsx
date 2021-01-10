import { blogColors, LabeledItem } from "@satek/shared-components";
import React from "react";

interface IProps {
  isFocused: boolean;
  hasValue: boolean;
  title: string;
  maxLabelWidth: string;
}

export const BlogLabeledItem: React.FC<IProps> = ({
  children,
  isFocused,
  hasValue,
  title,
  maxLabelWidth,
}) => {
  return (
    <LabeledItem
      text={title}
      width="100%"
      position="top"
      color={isFocused ? `${blogColors.black}` : `${blogColors.neutral}`}
      labelStyle={{
        fontSize: "1em",
        zIndex: 2,
        margin: "0",
        maxWidth: maxLabelWidth,
        transform:
          hasValue || isFocused
            ? "translate(-0.75rem, -1rem)"
            : "translate(-1.25rem, 2rem)",
        transition: "transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)",
      }}
    >
      {children}
    </LabeledItem>
  );
};

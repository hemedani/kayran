import { blogColors } from "@kayran/shared-components";
import React from "react";
import MemoEditIcon from "../../image/EditIcon";
import { ToolsIconWrapper } from "./ToolsIconWrapper";

interface IProps {
  color?: blogColors;
  width?: string;
  height?: string;
}

export const EditToolsBox: React.FC<IProps> = ({ color, width, height }) => {
  return (
    <ToolsIconWrapper bgColor={blogColors.white}>
      <MemoEditIcon fill={color} width={width} height={height} />
    </ToolsIconWrapper>
  );
};

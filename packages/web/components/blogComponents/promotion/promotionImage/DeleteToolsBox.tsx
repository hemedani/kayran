import React from "react";
import { blogColors } from "@kayran/shared-components";
import { ToolsIconWrapper } from "./ToolsIconWrapper";
import MemoDeleteIcon from "../../image/DeleteIcon";

interface IProps {
  color?: blogColors;
  width?: string;
  height?: string;
}

export const DeleteToolsBox: React.FC<IProps> = ({ color, height, width }) => {
  return (
    <ToolsIconWrapper bgColor={blogColors.white}>
      <MemoDeleteIcon fill={color} width={width} height={height} />
    </ToolsIconWrapper>
  );
};

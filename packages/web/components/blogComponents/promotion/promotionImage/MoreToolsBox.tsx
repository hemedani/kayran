import React from "react";
import { blogColors } from "@kayran/shared-components";
import MemoMoreIcon from "../../image/MoreIcon";
import { ToolsIconWrapper } from "./ToolsIconWrapper";

interface IProps {
  color?: blogColors;
  width?: string;
  height?: string;
}

export const MoreToolsBox: React.FC<IProps> = ({ color, width, height }) => {
  return (
    <ToolsIconWrapper>
      <MemoMoreIcon fill={color} width={width} height={height} />
    </ToolsIconWrapper>
  );
};

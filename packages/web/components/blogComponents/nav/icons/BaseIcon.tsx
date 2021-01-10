import styled from "styled-components";
import { blogColors } from "@kayran/shared-components";

/**
 * defining svg in this styled way enables us
 * change fill attribute using upper level's &:focus
 */
export interface IconProps {
  onClick?: () => void;
}

interface IconPathProps {
  fill?: string;
}

/**
 * TODO: replace the react svg with this Icon
 * in shared-components
 */
export const BaseIcon = styled.svg.attrs<IconProps>((props?: IconProps) => ({
  onClick: props?.onClick,
  width: "1rem",
  height: "1rem",
  viewBox: "0 0 56.966 56.966",

  version: "1.0",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
}))``;

/**
 * to set 'd' attrs in the inherited path,
 * get d from output of https://react-svgr.com/playground/?icon=true&typescript=true
 */
export const BaseIconPath = styled.path.attrs<IconPathProps>(
  ({ fill }: IconPathProps) => ({
    fill: fill || blogColors.neutralLight,
  })
)``;

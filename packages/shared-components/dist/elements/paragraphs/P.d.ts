import { IColor } from "../../interfaces/IColor";
import { IFont } from "../../interfaces/IFont";
export interface IP extends IColor, IFont {
    flex?: number;
    center?: boolean;
    ltr?: boolean;
    align?: "center" | "left" | "right" | "justify";
}
export declare const P: import("styled-components").StyledComponent<"p", any, IP, never>;

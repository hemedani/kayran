import { IColor } from "../../interfaces/IColor";
import { IFont } from "../../interfaces/IFont";
import { ISize } from "../../interfaces/ISize";
interface IProps extends IColor, ISize, IFont {
    flex?: number;
    enableFocus?: boolean;
    center?: boolean;
    direction?: "rtl" | "ltr";
    error?: boolean;
}
export declare const Input: import("styled-components").StyledComponent<"input", any, IProps, never>;
export {};

"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var styled_components_1 = require("styled-components");
var GlobalStyle_1 = require("../../GlobalStyle");
//TODO Fix properties to share between all apps
exports.Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n\n  flex: ", ";\n\n  border: 0;\n  width: ", ";\n\n  height: ", ";\n  min-height: ", ";\n\n  border-radius: 1rem;\n\n  background: ", ";\n\n  border: ", ";\n\n  direction: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  text-align: ", ";\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n\n  &:focus {\n    border-radius: 1rem;\n    outline: none;\n    border: 1px solid ", ";\n  }\n"], ["\n  display: flex;\n  align-items: center;\n\n  flex: ", ";\n\n  border: 0;\n  width: ", ";\n\n  height: ", ";\n  min-height: ", ";\n\n  border-radius: 1rem;\n\n  background: ", ";\n\n  border: ", ";\n\n  direction: ", ";\n  font-size: ", ";\n  font-family: ", ";\n  text-align: ", ";\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n\n  &:focus {\n    border-radius: 1rem;\n    outline: none;\n    border: 1px solid ", ";\n  }\n"])), function (props) { return props.flex || 0; }, function (props) { return props.width; }, function (props) { return props.height || "2.5rem"; }, function (props) { return props.height || "2.5rem"; }, function (props) { return props.bg || GlobalStyle_1.colors.aliceBlue; }, function (props) { return (props.error ? "1px solid " + GlobalStyle_1.colors.red : ""); }, function (props) { return props.direction || "rtl"; }, function (props) { return props.fontSize || "1rem"; }, function (props) { return props.fontWeight || GlobalStyle_1.Fonts.primaryFont; }, function (props) { return (props.center ? "center" : ""); }, GlobalStyle_1.colors.primaryBlue);
var templateObject_1;
//# sourceMappingURL=Input.js.map
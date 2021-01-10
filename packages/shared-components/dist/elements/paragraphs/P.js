"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.P = void 0;
var styled_components_1 = require("styled-components");
var GlobalStyle_1 = require("../../GlobalStyle");
exports.P = styled_components_1.default.p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  text-align: ", ";\n\n  color: ", ";\n  background: ", ";\n  border: ", ";\n\n  flex: ", ";\n\n  display: flex;\n  align-items: center;\n  justify-content: ", ";\n  direction: ", ";\n"], ["\n  font-family: ", ";\n  font-weight: ", ";\n  font-size: ", ";\n  text-align: ", ";\n\n  color: ", ";\n  background: ", ";\n  border: ", ";\n\n  flex: ", ";\n\n  display: flex;\n  align-items: center;\n  justify-content: ", ";\n  direction: ", ";\n"])), function (_a) {
    var fontFamily = _a.fontFamily;
    return fontFamily || GlobalStyle_1.Fonts.primaryFont;
}, function (_a) {
    var fontWeight = _a.fontWeight;
    return fontWeight;
}, function (props) { return props.fontSize || "1.25em"; }, function (props) { return props.align; }, function (props) { return (props.color ? props.color : GlobalStyle_1.colors.black); }, function (props) { return props.bg; }, function (props) { return props.borderColor && "1px solid " + props.borderColor; }, function (props) { return props.flex; }, function (props) { return props.center && "center"; }, function (props) { return props.ltr && "ltr"; });
var templateObject_1;
//# sourceMappingURL=P.js.map
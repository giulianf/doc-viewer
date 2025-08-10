"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var state_1 = require("./state");
var Image_1 = __importDefault(require("./components/Image"));
var ImageControls_1 = __importDefault(require("./components/ImageControls"));
var ImageProxyRenderer = function (props) {
    var mainState = props.mainState;
    if (!mainState.currentDocument)
        return null;
    return (react_1.default.createElement(state_1.ImageProvider, { mainState: mainState },
        react_1.default.createElement(Container, __assign({ id: "image-renderer" }, props),
            react_1.default.createElement(ImageControls_1.default, null),
            react_1.default.createElement(Image_1.default, null))));
};
exports.default = ImageProxyRenderer;
ImageProxyRenderer.fileTypes = [];
ImageProxyRenderer.weight = 0;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  background-color: #fff;\n"], ["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  background-color: #fff;\n"])));
var templateObject_1;

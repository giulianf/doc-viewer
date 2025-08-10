"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var icons_1 = require("./icons");
var common_1 = require("../../../components/common");
var getFileName_1 = require("../../../utils/getFileName");
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var reducer_1 = require("../state/reducer");
var ImageControls = function () {
    var _a = (0, react_1.useContext)(state_1.ImageContext), _b = _a.state, mainState = _b.mainState, zoomLevel = _b.zoomLevel, dispatch = _a.dispatch;
    var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
    var fileName = (0, getFileName_1.getFileName)(mainState === null || mainState === void 0 ? void 0 : mainState.config, mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument);
    return (react_1.default.createElement(Container, { id: "image-controls" },
        (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) && (react_1.default.createElement(DownloadButton, { id: "image-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData, download: fileName },
            react_1.default.createElement(icons_1.DownloadImageIcon, { color: "#000", size: "75%" }))),
        react_1.default.createElement(ControlButton, { id: "image-zoom-out", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(zoomLevel - 0.1)); } },
            react_1.default.createElement(icons_1.ZoomOutImageIcon, { color: "#000", size: "80%" })),
        react_1.default.createElement(ControlButton, { id: "image-zoom-in", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(zoomLevel + 0.1)); } },
            react_1.default.createElement(icons_1.ZoomInImageIcon, { color: "#000", size: "80%" })),
        react_1.default.createElement(ControlButton, { id: "image-zoom-reset", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(reducer_1.initialImageState.zoomLevel)); }, disabled: zoomLevel === reducer_1.initialImageState.zoomLevel },
            react_1.default.createElement(icons_1.ResetZoomImageIcon, { color: "#000", size: "70%" }))));
};
exports.default = ImageControls;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n\twidth: 100%;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"], ["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n\twidth: 100%;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"])), function (props) { return props.theme.tertiary; });
var ControlButton = (0, styled_components_1.default)(common_1.Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var DownloadButton = (0, styled_components_1.default)(common_1.LinkButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;

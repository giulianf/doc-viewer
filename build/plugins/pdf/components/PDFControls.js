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
var common_1 = require("../../../components/common");
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var reducer_1 = require("../state/reducer");
var icons_1 = require("./icons");
var PDFPagination_1 = __importDefault(require("./PDFPagination"));
var getFileName_1 = require("../../../utils/getFileName");
var PDFControls = function () {
    var _a = (0, react_1.useContext)(state_1.PDFContext), _b = _a.state, mainState = _b.mainState, paginated = _b.paginated, downloadable = _b.downloadable, zoomLevel = _b.zoomLevel, numPages = _b.numPages, dispatch = _a.dispatch;
    var currentDocument = (mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument) || null;
    var fileName = (0, getFileName_1.getFileName)(mainState === null || mainState === void 0 ? void 0 : mainState.config, mainState === null || mainState === void 0 ? void 0 : mainState.currentDocument);
    (0, react_1.useEffect)(function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // console.log('mainState?.config :: ', mainState?.config)
        if ((_b = (_a = mainState === null || mainState === void 0 ? void 0 : mainState.config) === null || _a === void 0 ? void 0 : _a.header) === null || _b === void 0 ? void 0 : _b.paginated) {
            dispatch((0, actions_1.setPDFPaginated)((_d = (_c = mainState === null || mainState === void 0 ? void 0 : mainState.config) === null || _c === void 0 ? void 0 : _c.header) === null || _d === void 0 ? void 0 : _d.paginated));
        }
        if (((_f = (_e = mainState === null || mainState === void 0 ? void 0 : mainState.config) === null || _e === void 0 ? void 0 : _e.header) === null || _f === void 0 ? void 0 : _f.downloadable) === false) {
            dispatch((0, actions_1.setPDFDownloadable)((_h = (_g = mainState === null || mainState === void 0 ? void 0 : mainState.config) === null || _g === void 0 ? void 0 : _g.header) === null || _h === void 0 ? void 0 : _h.downloadable));
        }
    }, []);
    // }, [mainState?.config])
    return (react_1.default.createElement(Container, { id: "pdf-controls" },
        paginated && numPages > 1 && react_1.default.createElement(PDFPagination_1.default, null),
        downloadable && (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData) && (react_1.default.createElement(DownloadButton, { id: "pdf-download", href: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileData, download: fileName },
            react_1.default.createElement(icons_1.DownloadPDFIcon, { color: "#000", size: "75%" }))),
        react_1.default.createElement(ControlButton, { id: "pdf-zoom-out", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(zoomLevel - 0.1)); } },
            react_1.default.createElement(icons_1.ZoomOutPDFIcon, { color: "#000", size: "80%" })),
        react_1.default.createElement(ControlButton, { id: "pdf-zoom-in", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(zoomLevel + 0.1)); } },
            react_1.default.createElement(icons_1.ZoomInPDFIcon, { color: "#000", size: "80%" })),
        react_1.default.createElement(ControlButton, { id: "pdf-zoom-reset", onMouseDown: function () { return dispatch((0, actions_1.setZoomLevel)(reducer_1.initialPDFState.zoomLevel)); }, disabled: zoomLevel === reducer_1.initialPDFState.zoomLevel },
            react_1.default.createElement(icons_1.ResetZoomPDFIcon, { color: "#000", size: "70%" })),
        numPages > 1 && (react_1.default.createElement(ControlButton, { id: "pdf-toggle-pagination", onMouseDown: function () { return dispatch((0, actions_1.setPDFPaginated)(!paginated)); } },
            react_1.default.createElement(icons_1.TogglePaginationPDFIcon, { color: "#000", size: "70%", reverse: paginated })))));
};
exports.default = PDFControls;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"], ["\n  display: flex;\n  position: sticky;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  justify-content: flex-end;\n  padding: 8px;\n  background-color: ", ";\n  box-shadow: 0px 2px 3px #00000033;\n\n  @media (max-width: 768px) {\n    padding: 6px;\n  }\n"])), function (props) { return props.theme.tertiary; });
var ControlButton = (0, styled_components_1.default)(common_1.Button)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var DownloadButton = (0, styled_components_1.default)(common_1.LinkButton)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3;

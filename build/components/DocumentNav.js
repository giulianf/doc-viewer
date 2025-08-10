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
exports.DocumentNav = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var Button_1 = require("./common/Button");
var icons_1 = require("./icons");
var DocumentNav = function () {
    var _a;
    var _b = (0, react_1.useContext)(state_1.DocViewerContext), _c = _b.state, config = _c.config, currentDocument = _c.currentDocument, currentFileNo = _c.currentFileNo, documents = _c.documents, dispatch = _b.dispatch;
    if (documents.length <= 1 || !currentDocument)
        return null;
    if ((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.disableDocumentNav)
        return null;
    var fileName = currentDocument.uri;
    var splitURL = fileName === null || fileName === void 0 ? void 0 : fileName.split("/");
    if (splitURL === null || splitURL === void 0 ? void 0 : splitURL.length) {
        fileName = splitURL[splitURL.length - 1];
    }
    return (react_1.default.createElement(Container, { id: "doc-nav" },
        react_1.default.createElement("p", { id: "doc-nav-info" },
            "Doc ",
            currentFileNo + 1,
            " of ",
            documents.length),
        react_1.default.createElement(ButtonPrev, { id: "doc-nav-prev", onClick: function () { return dispatch((0, actions_1.previousDocument)()); }, disabled: currentFileNo === 0 },
            react_1.default.createElement(icons_1.PrevDocIcon, { color: "#fff", size: "60%" })),
        react_1.default.createElement(ButtonNext, { id: "doc-nav-next", onClick: function () { return dispatch((0, actions_1.nextDocument)()); }, disabled: currentFileNo >= documents.length - 1 },
            react_1.default.createElement(icons_1.NextDocIcon, { color: "#fff", size: "60%" }))));
};
exports.DocumentNav = DocumentNav;
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"], ["\n  min-width: 150px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: flex-end;\n  margin: 0 10px;\n  color: ", ";\n"])), function (props) { return props.theme.text_primary; });
var ButtonPrev = (0, styled_components_1.default)(Button_1.ButtonSecondary)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"], ["\n  width: 30px;\n  height: 30px;\n  margin: 0 5px 0 10px;\n\n  @media (max-width: 768px) {\n    width: 25px;\n    height: 25px;\n  }\n"])));
var ButtonNext = (0, styled_components_1.default)(ButtonPrev)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0 5px;\n"], ["\n  margin: 0 5px;\n"])));
var templateObject_1, templateObject_2, templateObject_3;

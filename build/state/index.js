"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = exports.DocViewerContext = void 0;
var react_1 = __importStar(require("react"));
var actions_1 = require("./actions");
var reducer_1 = require("./reducer");
var DocViewerContext = (0, react_1.createContext)({ state: reducer_1.initialState, dispatch: function () { return null; } });
exports.DocViewerContext = DocViewerContext;
var AppProvider = function (props) {
    var children = props.children, documents = props.documents, config = props.config, pluginRenderers = props.pluginRenderers, onLoadError = props.onLoadError;
    var _a = (0, react_1.useState)([]), documentsState = _a[0], setDocumentsState = _a[1];
    var _b = (0, react_1.useState)(__assign(__assign({}, reducer_1.initialState), { documents: documents || [], currentDocument: documents && documents.length ? documents[0] : undefined, config: config, pluginRenderers: pluginRenderers, onLoadError: onLoadError })), newDocs = _b[0], setNewDocs = _b[1];
    // console.log('newDocs :: ', newDocs)
    var _c = (0, react_1.useState)(__assign({}, newDocs)), fullState = _c[0], setFullState = _c[1];
    // console.log('initialState :: ', initialState)
    (0, react_1.useEffect)(function () {
        // console.log('documentsState :: ', documentsState)
        // console.log('documents :: ', documents)
        var newDoc = documents === null || documents === void 0 ? void 0 : documents.map(function (doc, i) { var _a; return doc.uri === ((_a = documentsState[i]) === null || _a === void 0 ? void 0 : _a.uri); }).filter(function (v) { return !v; });
        // console.log('newDoc :: ', newDoc)
        if ((newDoc === null || newDoc === void 0 ? void 0 : newDoc.length) > 0) {
            setDocumentsState(documents);
            setFullState(__assign({}, newDocs));
        }
    }, [documents]);
    var _d = (0, react_1.useReducer)(reducer_1.mainStateReducer, fullState), state = _d[0], dispatch = _d[1];
    // On initial load, and whenever they change,
    // replace documents with the new props passed in
    (0, react_1.useEffect)(function () {
        var newDoc = documents === null || documents === void 0 ? void 0 : documents.map(function (doc, i) { var _a; return doc.uri === ((_a = documentsState[i]) === null || _a === void 0 ? void 0 : _a.uri); }).filter(function (v) { return !v; });
        if ((newDoc === null || newDoc === void 0 ? void 0 : newDoc.length) > 0) {
            dispatch((0, actions_1.setAllDocuments)(documents));
            config && dispatch((0, actions_1.setMainConfig)(config));
        }
    }, [documents]);
    return (react_1.default.createElement(DocViewerContext.Provider, { value: { state: state, dispatch: dispatch } }, children));
};
exports.AppProvider = AppProvider;

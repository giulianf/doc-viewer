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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDocumentLoader = void 0;
var react_1 = require("react");
var state_1 = require("../state");
var actions_1 = require("../state/actions");
var fileLoaders_1 = require("./fileLoaders");
var useRendererSelector_1 = require("./useRendererSelector");
/**
 * Custom Hook for loading the current document into context
 */
var useDocumentLoader = function () {
    var _a = (0, react_1.useContext)(state_1.DocViewerContext), state = _a.state, dispatch = _a.dispatch;
    var currentFileNo = state.currentFileNo, currentDocument = state.currentDocument, prefetchMethod = state.prefetchMethod;
    var CurrentRenderer = (0, useRendererSelector_1.useRendererSelector)().CurrentRenderer;
    var documentURI = (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri) || "";
    (0, react_1.useEffect)(function () {
        if (!currentDocument)
            return;
        if (currentDocument.fileType !== undefined)
            return;
        // If fileData is a Blob, derive type locally without fetching
        var fd = currentDocument.fileData;
        if (typeof Blob !== "undefined" && fd instanceof Blob) {
            dispatch((0, actions_1.updateCurrentDocument)(__assign(__assign({}, currentDocument), { fileType: fd.type || undefined })));
            return;
        }
        var controller = new AbortController();
        var signal = controller.signal;
        // Avoid HEAD for blob: URIs
        var method = prefetchMethod ? prefetchMethod : (documentURI.startsWith("blob:") ? "GET" : "HEAD");
        fetch(documentURI, {
            method: method,
            signal: signal,
        }).then(function (response) {
            var contentTypeRaw = response.headers.get("content-type");
            var contentTypes = (contentTypeRaw === null || contentTypeRaw === void 0 ? void 0 : contentTypeRaw.split(";")) || [];
            var contentType = contentTypes.length ? contentTypes[0] : undefined;
            dispatch((0, actions_1.updateCurrentDocument)(__assign(__assign({}, currentDocument), { fileType: contentType || undefined, status: response.status })));
        });
        return function () {
            controller.abort();
        };
    }, 
    // eslint ignore added, because a warning appears for dispatch to
    // be a dependancy of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentFileNo, documentURI]);
    (0, react_1.useEffect)(function () {
        var _a;
        if (!currentDocument || CurrentRenderer === undefined)
            return;
        var controller = new AbortController();
        var signal = controller.signal;
        var fileLoaderComplete = function (fileReader) {
            if (!currentDocument || !fileReader) {
                dispatch((0, actions_1.setDocumentLoading)(false));
                return;
            }
            var updatedDocument = __assign({}, currentDocument);
            if (fileReader.result !== null) {
                updatedDocument.fileData = fileReader.result;
            }
            dispatch((0, actions_1.updateCurrentDocument)(updatedDocument));
            dispatch((0, actions_1.setDocumentLoading)(false));
        };
        // If fileData already provided, handle it
        if (currentDocument.fileData !== undefined) {
            var fd = currentDocument.fileData;
            // If it's a Blob, convert it to what the renderer expects
            if (typeof Blob !== "undefined" && fd instanceof Blob) {
                var reader_1 = new FileReader();
                reader_1.addEventListener("loadend", function () { return fileLoaderComplete(reader_1); });
                var desiredLoader = CurrentRenderer === null || CurrentRenderer === void 0 ? void 0 : CurrentRenderer.fileLoader;
                // Choose how to read the Blob based on renderer's loader preference
                if (desiredLoader === fileLoaders_1.arrayBufferFileLoader) {
                    reader_1.readAsArrayBuffer(fd);
                }
                else if (desiredLoader === fileLoaders_1.binaryStringFileLoader) {
                    reader_1.readAsBinaryString(fd);
                }
                else if (desiredLoader === fileLoaders_1.textFileLoader) {
                    reader_1.readAsText(fd);
                }
                else {
                    // default behavior consistent with defaultFileLoader
                    reader_1.readAsDataURL(fd);
                }
            }
            else {
                // Already a string or ArrayBuffer => nothing to load
                dispatch((0, actions_1.setDocumentLoading)(false));
            }
            return function () {
                controller.abort();
            };
        }
        if (CurrentRenderer === null) {
            dispatch((0, actions_1.setDocumentLoading)(false));
        }
        else if (CurrentRenderer.fileLoader !== undefined) {
            (_a = CurrentRenderer.fileLoader) === null || _a === void 0 ? void 0 : _a.call(CurrentRenderer, { documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        else {
            (0, fileLoaders_1.defaultFileLoader)({ documentURI: documentURI, signal: signal, fileLoaderComplete: fileLoaderComplete });
        }
        return function () {
            controller.abort();
        };
    }, [CurrentRenderer]);
    return { state: state, dispatch: dispatch, CurrentRenderer: CurrentRenderer };
};
exports.useDocumentLoader = useDocumentLoader;

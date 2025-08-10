"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
var getFileName = function (config, currentDocument) {
    var _a;
    var fileName = "";
    if (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.fileName) {
        fileName = currentDocument.fileName;
    }
    else {
        fileName = (currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri) || "";
        fileName = decodeURI(fileName);
        if (!((_a = config === null || config === void 0 ? void 0 : config.header) === null || _a === void 0 ? void 0 : _a.retainURLParams)) {
            fileName = fileName.split("?")[0];
        }
        var splitURL = fileName.split("/");
        if (splitURL.length) {
            fileName = splitURL[splitURL.length - 1];
        }
    }
    return fileName;
};
exports.getFileName = getFileName;

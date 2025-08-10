"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setZoomLevel = exports.SET_ZOOM_LEVEL = void 0;
// SET_ZOOM_LEVEL
exports.SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
var setZoomLevel = function (value) { return ({
    type: exports.SET_ZOOM_LEVEL,
    value: value,
}); };
exports.setZoomLevel = setZoomLevel;

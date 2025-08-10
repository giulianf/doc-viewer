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
exports.reducer = exports.initialImageState = void 0;
var actions_1 = require("./actions");
exports.initialImageState = {
    zoomLevel: 1,
};
var reducer = function (state, action) {
    if (state === void 0) { state = exports.initialImageState; }
    switch (action.type) {
        case actions_1.SET_ZOOM_LEVEL: {
            var value = action.value;
            return __assign(__assign({}, state), { zoomLevel: value });
        }
        default:
            return state;
    }
};
exports.reducer = reducer;

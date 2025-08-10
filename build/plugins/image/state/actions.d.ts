export declare const SET_ZOOM_LEVEL = "SET_ZOOM_LEVEL";
export interface SetZoomLevel {
    type: typeof SET_ZOOM_LEVEL;
    value: number;
}
export declare const setZoomLevel: (value: number) => SetZoomLevel;
export type ImageActions = SetZoomLevel;

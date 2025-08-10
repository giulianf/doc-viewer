import { ImageActions as ImageStateActions } from "./actions";
import { IMainState } from "../../../state/reducer";
export type IImageState = {
    zoomLevel: number;
    mainState?: IMainState;
};
export declare const initialImageState: IImageState;
export type ImageStateReducer = (state: IImageState, action: ImageStateActions) => IImageState;
export declare const reducer: ImageStateReducer;

import { DocRenderer, IConfig, IDocument } from "../types";
import { MainStateActions } from "./actions";
export type IMainState = {
    currentFileNo: number;
    documents: IDocument[];
    documentLoading?: boolean;
    currentDocument?: IDocument;
    rendererRect?: DOMRect;
    config?: IConfig;
    pluginRenderers?: DocRenderer[];
    prefetchMethod?: string;
    onLoadError: (err: any) => void;
};
export declare const initialState: IMainState;
export type MainStateReducer = (state: IMainState, action: MainStateActions) => IMainState;
export declare const mainStateReducer: MainStateReducer;

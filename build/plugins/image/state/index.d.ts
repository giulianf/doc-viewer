import React, { Dispatch, FC } from "react";
import { ImageActions } from "./actions";
import { IImageState } from "./reducer";
import { IMainState } from "../../../state/reducer";
declare const ImageContext: React.Context<{
    state: IImageState;
    dispatch: Dispatch<ImageActions>;
}>;
declare const ImageProvider: FC<{
    mainState: IMainState;
}>;
export { ImageContext, ImageProvider };

import { createContext, Dispatch, SetStateAction } from "react";
import { IMedia } from "../models/mediaModel";


export interface IMediaContext {
    media: Array<IMedia>;
    setMedia: Dispatch<IMedia[]>
}

const MediaContext = createContext<IMediaContext>({
    media: [],
    setMedia: () => {}
});
MediaContext.displayName = "MediaContext";

export default MediaContext;

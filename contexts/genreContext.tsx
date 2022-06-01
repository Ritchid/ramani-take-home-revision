import { createContext} from "react";

import { IGenre } from "../models/genreModel";
import { GENRE_TYPES } from "../resources/enums";


export interface IGenreContext {
    movieGenres: Array<IGenre>;
    seriesGenres: Array<IGenre>;
    addGenre: (data: Array<IGenre>, type: GENRE_TYPES) =>void;
}

const GenreContext = createContext<IGenreContext>({
    movieGenres: [],
    seriesGenres: [],
    addGenre: () => {}
});
GenreContext.displayName = "GenreContext";

export default GenreContext;

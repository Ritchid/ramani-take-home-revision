export interface IGenre {
    id: number;
    name: string;
}

class Genre {
    id: number;
    name: string;

    constructor(data: IGenre) {
        this.id = data.id;
        this.name = data.name;
    }
}

export default Genre;
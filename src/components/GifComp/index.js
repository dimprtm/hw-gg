import Gif from "./Gif";
import data from "../../data/gif-data.js"

const GifComp = () => {
    return data.map(g => {
        return g.rating === "pg" ? '' : (
            <Gif
                key={g.id}
                gifUrl={g.url} 
                gifTitle={g.title} 
                gifRating={g.rating}
            />
        );
    });
}

export default GifComp;
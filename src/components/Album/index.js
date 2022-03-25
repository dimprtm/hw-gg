import AlbumImg from "./AlbumImg";
import SongTitle from "./SongTitle";
import Artist from "./Artist";
import spotifyData from "../../data/spotify-data";
import './Style.css';

const Album = () => {
    return (
        <div className="album-wrapp">
            {spotifyData.map((item, index) => {
                return (
                    <div className="album" key={index}>
                        <AlbumImg albumimgUrl={item.album.images[0].url} className="album-img" />
                        <div className="text">
                            <SongTitle songTitle={item.album.artists[0].name}/>
                            <Artist artistName={item.name} />
                            <button>Select</button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Album;
import AlbumImg from "./AlbumImg";
import SongTitle from "./SongTitle";
import Artist from "./Artist";
import data from "../../data/spotify-data";
import './Style.css';

const Album = () => {
    return (
        <div className="album-wrapp">
                <div className="album">
                    <AlbumImg albumimgUrl={data.album.images[0].url} className="album-img" />
                    <div className="text">
                        <SongTitle songTitle={data.album.artists[0].name}/>
                        <Artist artistName={data.name} />
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <AlbumImg albumimgUrl={data.album.images[0].url} className="album-img" />
                    <div className="text">
                        <SongTitle songTitle={data.album.artists[0].name}/>
                        <Artist artistName={data.name} />
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <AlbumImg albumimgUrl={data.album.images[0].url} className="album-img" />
                    <div className="text">
                        <SongTitle songTitle={data.album.artists[0].name}/>
                        <Artist artistName={data.name} />
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <AlbumImg albumimgUrl={data.album.images[0].url} className="album-img" />
                    <div className="text">
                        <SongTitle songTitle={data.album.artists[0].name}/>
                        <Artist artistName={data.name} />
                        <button>Select</button>
                    </div>
                </div>
            </div>
    );
}

export default Album;
import React from "react";
import data from "../../data/spotify-data";
import './Style.css';

// console.log(data);

const Album = () => {
    return (
        <div className="container">
            <div className="album-wrapp">
                <div className="album">
                    <img src={data.album.images[0].url} alt={data.album.name} className="album-img"/>
                    <div className="text">
                        <h3 className="song-title">{data.album.artists[0].name}</h3>
                        <p className="artist-name">{data.name}</p>
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <img src={data.album.images[0].url} alt={data.album.name} className="album-img"/>
                    <div className="text">
                        <h3 className="song-title">{data.album.artists[0].name}</h3>
                        <p className="artist-name">{data.name}</p>
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <img src={data.album.images[0].url} alt={data.album.name} className="album-img"/>
                    <div className="text">
                        <h3 className="song-title">{data.album.artists[0].name}</h3>
                        <p className="artist-name">{data.name}</p>
                        <button>Select</button>
                    </div>
                </div>

                <div className="album">
                    <img src={data.album.images[0].url} alt={data.album.name} className="album-img"/>
                    <div className="text">
                        <h3 className="song-title">{data.album.artists[0].name}</h3>
                        <p className="artist-name">{data.name}</p>
                        <button>Select</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Album;
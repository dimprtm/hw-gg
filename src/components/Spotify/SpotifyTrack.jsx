import { useEffect, useState } from "react"
import AlbumImg from "../Album/AlbumImg";
import Artist from "../Album/Artist";
import SongTitle from "../Album/SongTitle";
import axios from "axios";

const spotify_tracks_endpoint = 'https://api.spotify.com/v1/search';

const SpotifyTrack = () => {
    const [token, setToken] = useState('');
    const [tracks, setTracks] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        if(localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"))
        }
    }, []);

    const handleInput = e => {
        setKeyword(e.target.value);
    }

    const getTracks = async (e) => {
        e.preventDefault()
        const {data} = await axios.get(spotify_tracks_endpoint, {
            headers: {
                Authorization: "Bearer " + token,
            },
            params: {
                q: keyword,
                type: "track",
                market: "ID"
            }
        })
        setTracks(data.tracks.items)
        console.log(data);
    }
    
    return (
        <>
            <form action="" onSubmit={getTracks}>
                <input type="text" onChange={handleInput} placeholder="Search tracks"/>
                <button type={"submit"}>Search</button>
            </form>
            <div className="album-wrapp">
                {
                    tracks.map(t => {
                        return(
                            <div className="album" >
                                <AlbumImg  className="album-img" albumimgUrl={t.album.images[0].url}/>
                                <div className="text">
                                    <SongTitle songTitle={t.album.artists[0].name}/>
                                    <Artist artistName={t.name} />
                                    <button>Select</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SpotifyTrack;
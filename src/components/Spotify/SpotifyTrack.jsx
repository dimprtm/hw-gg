import { useEffect, useState } from "react";
import AlbumImg from "../Album/AlbumImg";
import Artist from "../Album/Artist";
import SongTitle from "../Album/SongTitle";
import axios from "axios";

const spotify_tracks_endpoint = "https://api.spotify.com/v1/search";

const SpotifyTrack = () => {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selecteds, setSelecteds] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const addSelectedTrack = (track) => {
    const newSelectedList = [...selecteds, track];
    setSelecteds(newSelectedList);
  }

  const handleInput = (e) => {
    setKeyword(e.target.value);
  };

  const handleLogout = () => {
    window.location = "http://localhost:3000";
    localStorage.clear();
  };

  const getTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(spotify_tracks_endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        q: keyword,
        type: "track",
        market: "ID",
      },
    });
    setTracks(data.tracks.items);
    console.log(data);
  };

  return (
    <div className="left">
      <button onClick={handleLogout} className="btn-logout-spotify">Logout</button>
      <h2>Search Tracks</h2>
      <form action="" onSubmit={getTracks}>
        <input type="text" onChange={handleInput} placeholder="Search tracks" />
        <button type={"submit"}>Search</button>
      </form>
      <div className="album-wrapp">
        {tracks.map((t) => {
          return (
            <div className="album" key={t.album.uri}>
              <AlbumImg
                className="album-img"
                albumimgUrl={t.album.images[0].url}
              />
              <div className="text">
                <SongTitle songTitle={t.name} />
                <Artist artistName={t.album.artists[0].name} />
                {!isSelected ? (
                  <button onClick={addSelectedTrack}>Select</button>
                ) : (
                  <button onClick={() => setIsSelected(false)}>Deselect</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpotifyTrack;

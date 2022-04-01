import React, { useState, useEffect } from 'react';
import './Spotify.css';
import axios from 'axios'
import SpotifyLogo from '../../assets/SpotifyLogo.svg';
import TrackList from './TrackList';
import SearchBox from './SearchBox';
import ButtonSelect from './ButtonSelect';
import ButtonDeselect from './ButtonDeselect';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000";
const scope = "playlist-modify-private";
const spotify_tracks_endpoint = 'https://api.spotify.com/v1/search';

const getHashParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

const Spotify = () => {
  const [token, setToken] = useState('');
	const [tracks, setTracks] = useState([]);
	const [selectedTracks, setSelectedTracks] = useState([]);
	const [keyword, setKeyword] = useState('');

  useEffect(() => {
    if(localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"))
    }
}, []);

useEffect(() => {
  if (window.location.hash) {
    const { access_token, expires_in, token_type } = getHashParams(window.location.hash);

    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
  }
}, [getHashParams]);

  const handleLogin = () => {
    window.location = `${spotify_auth_endpoint}?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`;
  }

  const handleLogout = () => {
    window.location = "http://localhost:3000";
    localStorage.removeItem("accessToken");
  };

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

	useEffect(() => {
		const trackSelecteds = JSON.parse(
			localStorage.getItem('selected-tracks')
		);

		if (trackSelecteds) {
			setSelectedTracks(trackSelecteds);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('selected-tracks', JSON.stringify(items));
	};

	const addSelectedTrack = (track) => {
		const newSelectedList = [...selectedTracks, track];
    setSelectedTracks(newSelectedList);
    saveToLocalStorage(newSelectedList);
	};

	const removeSelectedTrack = (track) => {
		const newSelectedList = selectedTracks.filter(
			(selected) => selected.album.id !== track.album.id
		);

		setSelectedTracks(newSelectedList);
		saveToLocalStorage(newSelectedList);
	};

	return (
    <div className="">
      {
        localStorage.getItem("accessToken") ? 
          <div className="column">
            <div className='logout'>
              <button onClick={handleLogout} className="btn-logout-spotify">Logout</button>
            </div>
            <div className='container'>
              <div className="left">
                <h2>🎵Search Spotify Tracks🎵</h2>
                <SearchBox searchValue={keyword} setKeyword={setKeyword} getTracks={getTracks} />
                <div className="album-wrapp">
                  <TrackList
                    tracks={tracks}
                    handleSelectedClick={addSelectedTrack}
                    buttonComponent={ButtonSelect}
                  />
                </div>
              </div>
              <div className="right">
                <div className="">
                  <h2>⭐Selected Tracks⭐</h2>
                </div>
                <div className='selected-track'>
                  <TrackList
                    tracks={selectedTracks}
                    handleSelectedClick={removeSelectedTrack}
                    buttonComponent={ButtonDeselect}
                  />
                </div>
              </div>
            </div>
          </div>
        :
          <div className='login'>
            <button onClick={handleLogin} className="btn-spotify">
              <img src={SpotifyLogo} className="spotify-logo" />
              Login to Spotify
            </button>
          </div>
      }
    </div>
  );
};

export default Spotify;
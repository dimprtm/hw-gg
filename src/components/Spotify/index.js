import React, { useState, useEffect } from 'react';
import './Spotify.css';
import SpotifyLogo from '../../assets/SpotifyLogo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { storeToken } from '../../actions';
import { Redirect } from 'react-router-dom';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000";
const scope = "user-read-private playlist-modify-private";

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
	const [selectedTracks, setSelectedTracks] = useState([]);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(localStorage.getItem("accessToken")) {
        // setToken(localStorage.getItem("accessToken"));
        dispatch(storeToken(localStorage.getItem("accessToken")));
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

	useEffect(() => {
		const trackSelecteds = JSON.parse(
			localStorage.getItem('selected-tracks')
		);

		if (trackSelecteds) {
			setSelectedTracks(trackSelecteds);
		}
	}, []);

	return (
    <div className="">
      {localStorage.getItem("accessToken") ? (
        <Redirect to="/create-playlist" />
      ) : (
        <div className="login">
          <button onClick={handleLogin} className="btn-spotify">
            <img src={SpotifyLogo} className="spotify-logo" alt="spotify-logo"/>
            Login to Spotify
          </button>
        </div>
      )}
    </div>
  );
};

export default Spotify;
import { useEffect, useState } from 'react';
import SpotifyLogo from '../../assets/SpotifyLogo.svg';
import './Spotify.css';
import SpotifyTrack from './SpotifyTrack';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000";
const scope = "playlist-modify-private";

const getHashParams = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    //   console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

const Spotify = () => {

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getHashParams(window.location.hash);
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
        }
      });
    

    const handleLogin = () => {
        window.location = `${spotify_auth_endpoint}?client_id=${spotify_client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token&show_dialog=true`;
    }

        return(
            <div>
                {    
                    localStorage.getItem("accessToken") ? <SpotifyTrack />
                :
                    <button onClick={handleLogin} className='btn-spotify'>
                        <img src={SpotifyLogo} className='spotify-logo' />
                        Login to Spotify
                    </button>
                }
            </div>
        );
}

export default Spotify;
import React, { useState, useEffect } from 'react';
import './Spotify.css';
import axios from 'axios'
import SpotifyLogo from '../../assets/SpotifyLogo.svg';
import TrackList from './TrackList';
import SearchBox from './SearchBox';
import ButtonSelect from './ButtonSelect';
import ButtonDeselect from './ButtonDeselect';
import SelectedTrackList from './SelectedTrackList';
import SpotifyPlaylistForm from './SpotifyPlaylistForm';
import { useSelector, useDispatch } from 'react-redux';
import { storeToken } from '../../actions';
import { Redirect } from 'react-router-dom';

const spotify_client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const spotify_auth_endpoint = "https://accounts.spotify.com/authorize";
const redirect_uri = "http://localhost:3000";
const scope = "user-read-private playlist-modify-private";
const spotify_tracks_endpoint = 'https://api.spotify.com/v1/search';
const spotify_getprofile_endpoint = 'https://api.spotify.com/v1/me';
const spotify_create_playlist_endpoint = "https://api.spotify.com/v1/users/user_id/playlists";

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
  const [activeTab, setActiveTab] = useState("tab1");
  const [profile, setProfile] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistForm, setPlaylistForm] = useState({
      title: "",
      description: ""
  });
  const dispatch = useDispatch();
  const newToken = useSelector((state) => state.token);

  const handleTab1 = () => {
      setActiveTab("tab1");
    };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  
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

const getProfile = async () => {
  await fetch(spotify_getprofile_endpoint, {
    headers: {
      Authorization: `Bearer ${newToken}`
    }
  }).then(res => res.json())
    .then(json => {
      setProfile(json);
      console.log(json);
    });
}

// useEffect(() => {
//     getProfile();
// }, []);

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
            Authorization: "Bearer " + newToken,
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

const postPlaylist = async (e) => {
    e.preventDefault();
    const {playlist} = await axios({
      method: "post",
      url: `https://api.spotify.com/v1/users/${profile.id}/playlists`,
      headers: {
        Authorization: "Bearer " + newToken,
      },
      data: {
        title: playlistForm.title,
        description: playlistForm.description,
        public: false,
        collaborative: false
      }
    })

    const trackUris = selectedTracks.map((item) => `${item.uri}, `);
    console.log(trackUris);

    axios({
      method: "post",
      url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      headers: {
        Authorization: "Bearer " + newToken,
      },
      data: {
        position: 0,
        uris: trackUris,
      }
    })
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

const handlePlaylistFormChange = e => {
    const {name, value} = e.target;
    setPlaylistForm({...playlistForm, [name]: value});
}

	return (
    <div className="">
      {localStorage.getItem("accessToken") ? (
        <Redirect to="/create-playlist" />
      ) : (
        <div className="login">
          <button onClick={handleLogin} className="btn-spotify">
            <img src={SpotifyLogo} className="spotify-logo" />
            Login to Spotify
          </button>
        </div>
      )}
    </div>
  );
};

export default Spotify;
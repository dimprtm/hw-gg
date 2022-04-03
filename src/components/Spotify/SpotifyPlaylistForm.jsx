import React, { useState } from "react";
import axios from "axios";

const spotify_create_playlist_endpoint = "https://api.spotify.com/v1/users/user_id/playlist";

const SpotifyPlaylistForm = (postPlaylist) => {
    const [playlistForm, setPlaylistForm] = useState({
        title: "",
        description: ""
    });

    const handlePlaylistFormChange = e => {
        const {name, value} = e.target;
        setPlaylistForm({...playlistForm, [name]: value});
    }

    
    
    return (
      <>
        <form action="" onSubmit={postPlaylist}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={playlistForm.title}
            onChange={handlePlaylistFormChange}
            placeholder="title..."
            minLength="10"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={playlistForm.description}
            onChange={handlePlaylistFormChange}
            cols="30"
            rows="10"
            placeholder="description..."
          ></textarea>
          {/* <input type="text" name="description" id="description" placeholder="description..."/> */}

          <button type={"submit"}>Create</button>
        </form>
      </>
    );
}

export default SpotifyPlaylistForm;
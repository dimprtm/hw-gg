import React from 'react';
import AlbumImg from '../Album/AlbumImg';
import Artist from '../Album/Artist';
import SongTitle from '../Album/SongTitle';

const SelectedTrackList = (props) => {
    const ButtonComponent = props.buttonComponent;

	return (
		<>
			{props.tracks.map((t, index) => (
				<div className="selected-track" key={t.album.uri}>
                    <AlbumImg className="album-img" albumimgUrl={t.album.images[0].url}/>
                    <div className='content'>
                        <div className="text-left">
                            <h3 className='song'>{t.name}</h3>
                            <p className='artist'>{t.album.artists[0].name}</p>
                        </div>
                        <div
                            onClick={() => props.handleSelectedClick(t)}
                            className=''
                        >
                            <ButtonComponent />
                        </div>
                    </div>
                </div>
            ))}
		</>
	);
};

export default SelectedTrackList;

import React from 'react';
import AlbumImg from '../Album/AlbumImg';
import Artist from '../Album/Artist';
import SongTitle from '../Album/SongTitle';
import ButtonDeselect from './ButtonDeselect';
import ButtonSelect from './ButtonSelect';

const TrackList = (props) => {
    const ButtonComponent = props.buttonComponent;

	return (
		<>
			{props.tracks.map((t, index) => (
				<div className="album" key={index + t.uri}>
                    <AlbumImg  className="album-img" albumimgUrl={t.album.images[0].url}/>
                    <div className="text">
                        <SongTitle songTitle={t.album.artists[0].name}/>
                        <Artist artistName={t.name} />
                    </div>
                    <div
						onClick={() => props.handleSelectedClick(t)}
						className='overlay d-flex align-items-center justify-content-center'
                    >
                        <ButtonComponent />
                    </div>
                </div>
            ))}
		</>
	);
};

export default TrackList;

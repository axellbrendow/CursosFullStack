import React, { useState } from 'react';
import uuid from 'uuid/v1';
import NewSongForm from '../NewSongForm';

const SongList = () => {
    const [songs, setSongs] = useState([
        {title: 'Before I Forget', id: 1},
        {title: 'Dead Memories', id: 2},
        {title: '(sic)', id: 3},
    ]);

    const addSong = (title) => {
        setSongs([...songs, {title, id: uuid()}]);
    };

    return (
        <div className="SongList">
            <ul>
                {songs.map((song) => <li key={song.id}>{song.title}</li>)}
            </ul>
            <NewSongForm addSong={addSong}/>
        </div>
    );
}

export default SongList;

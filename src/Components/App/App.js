import './App.css';
import React from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [{
                id: 1,
                name: 'Not Afraid',
                artist: 'Eminem',
                album: 'Recovery'
            }],
            playlistName: 'myPlaylist',
            playlistTracks: [{
                id: 1,
                name: 'Not Afraid',
                artist: 'Eminem',
                album: 'Recovery'
            }]
        };
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack(track) {
        const trackIds = this.state.playlistTracks.map((track) => {
            return track.id;
        });
        if (!(track.id in trackIds)) {
            this.state.playlistTracks.push(track);
        }
        return this.state.playlistTracks;
    }

    render() {
        console.log(this.state.playlistTracks);
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults props={{searchResults: this.state.searchResults}}
                                       onAdd={this.addTrack}/>
                        <Playlist props={{
                            name: this.state.playlistName,
                            tracks: this.state.playlistTracks
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

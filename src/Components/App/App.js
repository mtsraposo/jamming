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
        this.removeTrack = this.removeTrack.bind(this);
    }

    _getTrackIndexById(id) {
        return this.state.playlistTracks.findIndex((track)=> track.id === id);
    }

    addTrack(track) {
        const trackInList = !this._getTrackIndexById(track.id);

        if (!trackInList) {
            const afterInclusion = [...this.state.playlistTracks];
            afterInclusion.push(track);

            this.setState({
                playlistTracks: afterInclusion
            });
        }
    }

    removeTrack(track) {
        const trackIndex = this._getTrackIndexById(track.id);

        const afterDeletion = [...this.state.playlistTracks];
        afterDeletion.splice(trackIndex);

        this.setState({
            playlistTracks: afterDeletion
        })
    }

    render() {
        const searchResultsProps = {
            searchResults: this.state.searchResults,
            onAdd: this.addTrack,
            isRemoval: false,
        };

        const playlistProps = {
            name: this.state.playlistName,
            tracks: this.state.playlistTracks,
            onRemove: this.removeTrack,
            isRemoval: true,
        }

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults {...searchResultsProps}/>
                        <Playlist {...playlistProps}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

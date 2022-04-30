import './App.css';
import React from 'react';
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import {Spotify} from "../../util/Spotify";
import {apiParams} from "../../util/api_parameters";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePLaylistName = this.updatePLaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    async search(term) {
        console.log('Searching: ', term);
        const tracks = await Spotify.search(apiParams, term);

        this.setState({
            searchResults: tracks,
        });
    }

    async savePlaylist() {
        await Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks, apiParams);

        this.setState({
            playlistName: 'New Playlist',
            playlistTracks: [],
        });
    }

    updatePLaylistName(name) {
        this.setState({
            name: name
        });
    }

    _getTrackIndexById(id) {
        return this.state.searchResults.findIndex((track) => track.id === id);
    }

    addTrack(trackId) {
        const trackIndex = this._getTrackIndexById(trackId);

        if (trackIndex !== -1) {
            const track = this.state.searchResults[trackIndex];
            const afterInclusion = [...this.state.playlistTracks];
            afterInclusion.push(track);

            this.setState({
                playlistTracks: afterInclusion
            });
        }
    }

    removeTrack(trackId) {
        const trackIndex = this._getTrackIndexById(trackId);
        const track = this.state.playlistTracks[trackIndex];

        const afterDeletion = [...this.state.playlistTracks];
        afterDeletion.splice(track);

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
            onNameChange: this.updatePLaylistName,
            onSave: this.savePlaylist,
        }

        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
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

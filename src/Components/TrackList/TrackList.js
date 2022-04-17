import React from 'react';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map((track) => {
                    return (<div id={track.id}>
                        track.name, track.artist, track.album
                    </div>);
                })}
            </div>
        )
    }
}

export default TrackList;
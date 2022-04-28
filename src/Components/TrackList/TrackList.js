import React from 'react';
import Track from "../Track/Track";

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.genTrackList = this.genTrackList.bind(this);
    }

    genTrackList() {
        if (this.props.tracks.length === 0) {
            return <div>Add tracks to your playlist by using the search!</div>
        } else {
            return this.props.tracks.map((track) => {
                return (<Track key={track.id}
                               onAdd={this.props.onAdd}
                               onRemove={this.props.onRemove}
                               track={track}
                               isRemoval={this.props.isRemoval}
                />);
            });
        }
    }

    render() {
        return (
            <div className="TrackList">
                {this.genTrackList()}
            </div>
        )
    }
}

export default TrackList;
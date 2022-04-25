import React from 'react';
import Track from "../Track/Track";

class TrackList extends React.Component {
    constructor(props) {
        super(props);
        this.genTrackList = this.genTrackList.bind(this);
    }

    genTrackList() {
        if (!this.props.tracks) {
            return <div>No tracks yet</div>
        } else {
            return this.props.tracks.map((track) => {
                return (<Track onAdd={this.props.onAdd}
                               track={track}
                               isRemoval={this.props.isRemoval}/>);
            });
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="TrackList">
                {this.genTrackList()}
            </div>
        )
    }
}

export default TrackList;
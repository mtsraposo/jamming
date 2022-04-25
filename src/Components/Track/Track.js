import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    renderAction(isRemoval) {
        const buttonText = isRemoval ? "-" : "+";
        return (<button className="Track-action"
                        onClick={this.addTrack}>
            {buttonText}
        </button>);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction(this.props.isRemoval)}
            </div>
        )
    }
}

export default Track;
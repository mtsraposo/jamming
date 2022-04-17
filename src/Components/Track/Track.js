import React from 'react';
import 'Track.css';

const renderAction = (isRemoval) => {
    const buttonText = isRemoval ? "-" : "+";
    return <button className="Track-action">buttonText</button>;
}

class Track extends React.Component {
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here -->
                    </h3>
                    <p><!-- track artist will go here-->
                        | <!-- track album will go here -->
                    </p>
                </div>
                RenderAction(this.props.isRemoval)
            </div>
        )
    }
}

export default Track;
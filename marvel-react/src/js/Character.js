import React from 'react';

function Character (props) {

    return (
        <div className="container-hero">
            <h3 className="container-hero-name text-center" title={props.data.name}>{props.data.name}</h3>
            <div className="text-center">
                <img className="rounded portrait-hero"
                     src={props.data.thumbnail.path + '.' + props.data.thumbnail.extension}
                     onClick={props.onClick}
                     alt={props.data.name} />
            </div>
        </div>
    );
}

export default Character;
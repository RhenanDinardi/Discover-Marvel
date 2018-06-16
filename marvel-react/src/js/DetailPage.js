import React from 'react';

function DetailPage (props) {

    return (
        <div className="card flex-md-row mb-4 box-shadow h-md-250">
            <div className="card-body d-flex flex-column align-items-start">
                <h3 className="mb-0">
                    <a className="text-dark">{props.selected.name}</a>
                </h3>
                <div className="mb-1 text-muted">Nov 11</div>
                <p className="card-text mb-auto">{props.selected.description || 'No description avaliable.'}</p>
            </div>
            <img className="card-img-right flex-auto portrait-hero-display"
                 src={props.selected.thumbnail.path + '.' + props.selected.thumbnail.extension}
                 alt={props.selected.name} />
        </div>
    );
}

export default DetailPage;
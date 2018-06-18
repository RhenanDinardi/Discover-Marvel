import React from 'react';

function DetailPage (props) {

    var urlList = props.selected.urls.map((btn, index) => {

        return (
            <a key={index} className="btn-link btn btn-primary" href={btn.url} target="_blank" role="button">{btn.type}</a>
        );
    });

    var comicList =  props.selected.comics.items.map((comic, index) => {

        return (
                <li key={index}> {comic.name }</li>
        );
    });

    if (props.selected.comics.available > props.selected.comics.returned) {
        comicList.push(
            <p key={21} className="card-text mb-auto">And {props.selected.comics.available - props.selected.comics.returned} more!</p>
        )
    }

    var storyList = props.selected.stories.items.map((story, index) => {

        return (
            <li key={index}>{story.name }</li>
        );
    });

    if (props.selected.stories.available > props.selected.stories.returned) {
        storyList.push(
            <p key={21} className="card-text mb-auto">And {props.selected.stories.available - props.selected.stories.returned} more!</p>
        )
    }


    return (
        <div>
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                    <h3 className="mb-0">
                        <a className="text-dark">{props.selected.name}</a>
                    </h3>
                    <p className="card-text mb-auto">{props.selected.description || 'No description avaliable.'}</p>
                    <div>
                        {urlList}
                    </div>
                </div>
                <img className="card-img-right flex-auto portrait-hero-display"
                     src={props.selected.thumbnail.path + '.' + props.selected.thumbnail.extension}
                     alt={props.selected.name} />
            </div>
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                    <div className="mb-1 text-muted">Comics:</div>
                    {comicList}
                </div>
                <div className="card-body d-flex flex-column align-items-start">
                    <div className="mb-1 text-muted">Stories:</div>
                    {storyList}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
import React from 'react';

function DetailPage (props) {

    var urlList = props.selected.urls.map((btn, index) => {

        return (
            <a key={index} className="btn-link btn btn-primary" href={btn.url} target="_blank" role="button">{btn.type}</a>
        );
    });

    var comicList = [];
    if(props.listComics) {

        comicList = props.listComics.map((comic, index) => {

            return (
                <div className="container-comic"key={index}>
                    <div className="text-center">
                        <img className="rounded portrait-comic"
                             src={comic.thumbnail.path + '.' + comic.thumbnail.extension}
                             onClick={() => props.onClick(comic)}
                             alt={comic.title} />
                    </div>
                </div>
            );
        });

    }
    else{
        comicList.push(
            <div className="col-md-12 text-center" key={'retrieving'}>
                <p>Retrieving comic data...</p>
            </div>
        );
    }

    var selectedComic = null;
    if(props.selectedComic) {

        selectedComic = [];
        selectedComic.push (
            <div className="card-body d-flex flex-column align-items-start" key={'comicDetail'}>
                <h3 className="mb-0">
                    <a className="text-dark">{props.selectedComic.title}</a>
                </h3>
                <hr />
                <div>
                    <div className="mb-1 text-muted comic-value">USD ${props.selectedComic.prices[0].price}</div>
                    <div className="mb-1 text-muted comic-value">{props.selectedComic.pageCount} pages</div>
                </div>
                <hr />
                <p className="card-text mb-auto">{props.selectedComic.description || 'No description avaliable.'}</p>
            </div>
        );

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
                        <div className="row">
                            {comicList}
                        </div>
                    <div className="row">
                        {selectedComic}
                    </div>
                </div>
            </div>
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
                <div className="card-body d-flex flex-column align-items-start">
                    <div className="mb-1 text-muted">Stories:</div>
                    {storyList}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
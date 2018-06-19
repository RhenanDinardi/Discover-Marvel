import React from 'react';

function Pagination (props) {

    //calculos para definir numero de paginas
    var totalPages = Math.ceil(props.totalItems / props.pagination.itemsPerPage);

    //calcula paginas para serem exibidas de acordo com a pagina inicial
    const showPages = [];

    var itensShowing = (props.pagination.currentPage + 1) * props.pagination.itemsPerPage,
           interval = Math.floor(itensShowing / ((props.pagination.itemsPerPage * props.pagination.numPages) + 1));

    for (var x = 0; x < props.pagination.numPages; x++){

        var page = x + (interval * props.pagination.numPages),
            className = "page-item";

        if(page === props.pagination.currentPage) className += " active";

        if(page <= totalPages -1) showPages.push( renderPage(page, className));
    }

    function renderPage (i, className) {

        return (
            <li key={i} className={className}>
                <a className="page-link" onClick={() => handlerClick({i})}>{i+1}</a>
            </li>
        )
    }

    function handlerClick (_dir) {

        if(_dir === 'previous' && props.pagination.currentPage === 0) return;

        if(_dir === 'next' && props.pagination.currentPage >= totalPages -1) return;

        props.onClick(_dir);
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link"
                               aria-label="Anterior"
                               onClick={() => handlerClick('previous')}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Anterior</span>
                            </a>
                        </li>
                        {showPages}
                        <li className="page-item">
                            <a className="page-link"
                               aria-label="Próximo"
                               onClick={() => handlerClick('next')}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Próximo</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <p className="float-right">Resultados encontrados: {props.totalItems}</p>
            </div>
        </div>
    );
}

export default Pagination;
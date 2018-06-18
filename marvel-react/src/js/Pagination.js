import React from 'react';

function Pagination (props) {

    return (
        <div className="row">
            <div className="col-md-12">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link"
                               aria-label="Anterior"
                               onClick={() => props.onClick('previous')}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Anterior</span>
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link"
                               aria-label="Próximo"
                               onClick={() => props.onClick('next')}>
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
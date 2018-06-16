import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/bootstrap.min.css';

import marvelAPI from './js/marvelAPI.js';
import CharacterShowcase from './js/CharacterShowcase';
import DetailPage from './js/DetailPage';

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            //paginação dos herois da busca
            pagination :{
            itemsPerPage: 9,
            currentPage: 0,
            },

            //lista de herois da busca
            characterList : [],

            //heroi selecionado para detalhes
            displayedCharacter: null,

            //campo de busca
            searchField: ''
        };

        //inicializando API
        this.API = new marvelAPI();

        //chamada inicial da listagem
        this.getCharacterList();

        //eventos da busca
        this.handleChange = this.handleChange.bind(this);
    }

    /*
    *@description Busca lista de herois da paginaçao e busca por nome
     */
    getCharacterList(_name) {

        var _self = this;

        //turn on load
        this.API.getCharacterList(this.state.pagination, _name, function _callbackGetCharacterList (resp) {

            //undo load
            _self.setState({
                characterList: resp
            });
        })

    }

    /*
    *@description Atualiza input digitado de busca
     */
    handleChange(e) {

        this.setState({
            searchField: e.target.value
        });
    }

    /*
    *@description Atualiza input digitado de busca
     */
    searchByName() {

        //zera paginaçao
        this.setState({
            pagination :{
                itemsPerPage: 9,
                currentPage: 0,
            },
        }, () => {this.getCharacterList(this.state.searchField)});
    }

    /*
    *@description Atualiza index de paginaçao
     */
    paginate(_dir) {

        if(_dir === 'previous' && this.state.pagination.currentPage === 0) return;

        var newDir = (_dir === 'previous' ) ?  this.state.pagination.currentPage - 1 : this.state.pagination.currentPage + 1;

        this.setState({
            pagination: {
                currentPage: newDir,
                itemsPerPage: this.state.pagination.itemsPerPage,
            }
        },() => {this.getCharacterList()} );
    }


    /*
    *@description Busca detalhes do heroi selecionado
     */
    getCharacterData(_id) {

        if(this.state.displayedCharacter && this.state.displayedCharacter.id === _id) return;

        var _self = this;

        this.API.getCharacterData(_id, this.state.pagination, function _callbackgetCharacterData (resp) {

            _self.setState({
                displayedCharacter: resp
            });

            console.log(resp)
        })

    }


    render() {

        var canDisplayHero = (this.state.displayedCharacter != null);
        var displayHero = null;

        if(canDisplayHero) {
            displayHero = (
                <DetailPage
                    selected={this.state.displayedCharacter}
                />
            )
        };

        return (
            <main role="main">
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-3">Discover Marvel</h1>
                    <p>Conheça mais sobre os seus herois favoritos.</p>
                    <div className="input-group mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="Pesquise pelo nome do herói (em ingles)"
                               value={this.state.searchField}
                               onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={id => this.searchByName()}>Pesquisar</button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <CharacterShowcase
                            characterList={this.state.characterList}
                            onClick={id => this.getCharacterData(id)}
                        />
                    </div>
                    <div className="col-md-6">
                        {displayHero}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <nav>
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link"
                                       aria-label="Anterior"
                                       onClick={(i) => this.paginate('previous')}>
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Anterior</span>
                                    </a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link"
                                       aria-label="Próximo"
                                       onClick={(i) => this.paginate('next')}>
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Próximo</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            <hr/>
            </div>
            </main>
        );
    }
}

// ========================================

ReactDOM.render(
    <Application />,
    document.getElementById('root')
);

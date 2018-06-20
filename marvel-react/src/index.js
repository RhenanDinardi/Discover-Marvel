import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import './assets/css/bootstrap.min.css';

import marvelAPI from './js/api/marvelAPI.js';
import CharacterShowcase from './js/components/CharacterShowcase';
import Loader from './js/elements/Loader';

import DetailPage from './js/DetailPage';

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            //paginação dos herois da busca
            pagination :{
                itemsPerPage: 9,
                currentPage: 0,
                numPages: 5
            },

            //lista de herois da busca
            characterList : [],
            totalItems: null,

            //heroi selecionado para detalhes
            displayedCharacter: null,

            //lista de comics do heroi selecionado
            listComics: null,
            selectedComic: null,

            //campo de busca
            searchField: '',

            //controle do carregando da tela
            showLoader: true
        };

        //inicializando API
        this.API = new marvelAPI();

        //chamada inicial da listagem
        this.getCharacterList();

        //eventos da busca
        this.handleChange = this.handleChange.bind(this);
        this.searchByName = this.searchByName.bind(this);
    }

    /*
    *@description Busca lista de herois da paginaçao e busca por nome
     */
    getCharacterList(_name) {

        var _self = this;

        this.API.getCharacterList(this.state.pagination, _name, function _callbackGetCharacterList (resp, total) {

            _self.setState({
                characterList: resp,
                totalItems: total,
                showLoader: false
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
    searchByName(e) {

        //zera paginaçao
        this.setState({
            pagination :{
                itemsPerPage: 9,
                currentPage: 0,
                numPages: 5
            },
            displayedCharacter: null,
            showLoader: true
        }, () => {this.getCharacterList(this.state.searchField)});

        e.preventDefault();
    }

    /*
    *@description Atualiza index de paginaçao
     */
    paginate(_dir) {

        var newDir;
        if (_dir === 'previous' ) {

            newDir = this.state.pagination.currentPage - 1
        }
        else if (_dir === 'next') {
            newDir = this.state.pagination.currentPage + 1;
        }
        else {

            newDir = _dir.i;
        }
        this.setState({
            pagination: {
                currentPage: newDir,
                itemsPerPage: this.state.pagination.itemsPerPage,
                numPages: 5
            },
            showLoader: true
        },() => {this.getCharacterList(this.state.searchField || '')} );
    }


    /*
    *@description Busca detalhes do heroi selecionado
     */
    getCharacterData(_id) {

        if(this.state.displayedCharacter && this.state.displayedCharacter.id === _id) return;

        var _self = this;

        this.setState({
            showLoader: true
        }, () =>{

            this.API.getCharacterData(_id, this.state.pagination, function _callbackgetCharacterData (resp) {

                _self.setState({
                    displayedCharacter: resp,
                    showLoader: false
                });

                //carrega lista de comics daquele heroi
                _self.getCharacterComicData(_id);
            })

        });
    }

    /*
    *@description Busca algumas comics do heroi selecionado
     */
    getCharacterComicData(_id) {

        var _self = this;

        this.setState({
            listComics: null,
            selectedComic: null
        }, () =>{

            this.API.getCharacterComicData(_id, function _callbackgetCharacterComicData (resp) {

                _self.setState({
                    listComics: resp
                });

            })

        });
    }

    /*
    *@description Seta comic selecionada
     */
    setSelectedComic (_comic) {

        this.setState({
            selectedComic: _comic
        });
    }


    render() {

        var canDisplayHero = (this.state.displayedCharacter != null);
        var displayHero = null;

        if(canDisplayHero) {
            displayHero = (
                <DetailPage
                    selected={this.state.displayedCharacter}
                    listComics={this.state.listComics}
                    selectedComic={this.state.selectedComic}
                    onClick={comic => this.setSelectedComic(comic)}
                />
            )
        };

        var canDisplayLoad = (this.state.showLoader);
        var loader = null;

        if(canDisplayLoad) loader = ( <Loader /> );

        return (

            <main role="main">
                {loader}
            <div className="jumbotron jumbotron-header">
                <div className="container">
                    <h1 className="display-3 jumbotron-title">Discover Marvel</h1>
                    <p>Conheça mais sobre os seus herois favoritos.</p>
                    <form onSubmit={this.searchByName}>
                        <div className="input-group mb-3">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Pesquise pelo nome do herói (em ingles)"
                                   value={this.state.searchField}
                                   onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary jumbotron-btn"
                                        type="button"
                                        onClick={(e) => this.searchByName(e)}>Pesquisar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 container-list-hero">
                        <CharacterShowcase
                            characterList={this.state.characterList}
                            onClick={id => this.getCharacterData(id)}
                            paginate={dir => this.paginate(dir)}
                            totalItems={this.state.totalItems}
                            pagination={this.state.pagination}
                        />
                    </div>
                    <div className="col-md-6 container-details">
                        {displayHero}
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

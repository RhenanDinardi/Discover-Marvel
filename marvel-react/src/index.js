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
            totalItems: null,

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
        this.searchByName = this.searchByName.bind(this);
    }

    /*
    *@description Busca lista de herois da paginaçao e busca por nome
     */
    getCharacterList(_name) {

        var _self = this;

        //turn on load
        this.API.getCharacterList(this.state.pagination, _name, function _callbackGetCharacterList (resp, total) {

            //undo load
            _self.setState({
                characterList: resp,
                totalItems: total
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
            },
        }, () => {this.getCharacterList(this.state.searchField)});

        e.preventDefault();
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

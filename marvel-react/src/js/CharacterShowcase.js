import React from 'react';
import Character from './Character.js';
import Pagination from './Pagination.js';

class CharacterShowcase extends React.Component {

    renderHero(_char) {
        return (
                <Character data={_char}
                           onClick={() => this.props.onClick(_char.id)}
                />
        );
    }

    render() {

        const dataList = this.props.characterList;
        const pageList = dataList.map((char, index) => {
            return (
                    <div className="col-md-4" key={index}>
                    {this.renderHero(char)}
                    </div>
                );
        });

        if(pageList.length === 0){
            pageList.push(
                <div className="col-md-12" key={999}>
                    <p>Nenhum resultado encontrado</p>
                </div>
            )
        }

        return (
            <div className="row">
                { pageList}
                <div className="col-md-12">
                    <Pagination
                        totalItems={ this.props.totalItems}
                        onClick={(dir) => this.props.paginate(dir)}
                    />
                </div>
            </div>
        );
    }


}

export default CharacterShowcase;
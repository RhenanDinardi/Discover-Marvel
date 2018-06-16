import React from 'react';
import Character from './Character.js';

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

        return (
            <div className="row">
                { pageList}
            </div>
        );
    }


}

export default CharacterShowcase;
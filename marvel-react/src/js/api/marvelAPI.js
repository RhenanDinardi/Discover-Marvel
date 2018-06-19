/**
 * controle das requisiçoes da api Marvel
 */
import axios from 'axios';
import CryptoJS from 'crypto-js';

class marvelAPI {

    constructor() {
        this.PublicKey = 'c7984588bcfe48f51af593c1b291c3b4';
        this.PrivateKey = '7ea918e1490b3328bb950a3510634056a5ba2fbc';
    }

    /*
    *@description seta valores basicos dos parametros da API
     */
    getBaseParams () {

        var newTs = new Date().getTime(),
            newHash = CryptoJS.MD5(newTs + this.PrivateKey + this.PublicKey).toString();

        var params = {
            params: {
                apikey: this.PublicKey,
                ts: newTs,
                hash: newHash,
            }
        }

        return params;
    }

    /*
    *@description Busca lista de herois
     */
    getCharacterList (_pagination, _name, _callback) {

        var params = this.getBaseParams();

        //seta intervalo de paginaçao
        params.params.limit = _pagination.itemsPerPage || 9;
        params.params.offset = (_pagination.currentPage * params.params.limit) || 0;

        if(_name) params.params.nameStartsWith = _name;

        //console.log(params);
        axios
            .get("https://gateway.marvel.com/v1/public/characters", params)
            .then(response => {
                _callback && _callback(response.data.data.results, response.data.data.total);
            })
            .catch(error => {
                console.log(error)
                _callback && _callback([]);
            });

    }

    /*
    *@description Busca detalhes dos herois
     */
    getCharacterData = function (_id, _pagination, _callback) {

        var params = this.getBaseParams();

        //seta intervalo de paginaçao
        params.params.limit = 9;
        params.params.offset = 0;

        //console.log(params);
        axios
            .get("https://gateway.marvel.com/v1/public/characters/" + _id, params)
            .then(response => {
                //console.log(response.data.data.results[0]);

                _callback && _callback(response.data.data.results[0]);
            })
            .catch(error => {
                console.log(error)
                _callback && _callback([]);
            });
    }

}

export default marvelAPI;
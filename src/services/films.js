const fetch = require('node-fetch');

const urlEndPoint = 'https://swapi.co/api/films';

const getFilms = async() => {
    return new Promise((resolve, reject) => {
        fetch(urlEndPoint)
            .then(res => res.json())
            .then((json) => {
                resolve(json.results);
            });
    }).catch(err => console.error(err));
}

const getServiceFromUrl = async(url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                resolve(json);
            });
    }).catch(err => console.error(err));
}

module.exports = {
    getFilms,
    getServiceFromUrl
}
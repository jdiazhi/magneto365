const filmService = require('./services/films');

const getFilms = async() => {
    var films = await filmService.getFilms();
    var finalFilms = [];
    films.forEach(async(film) => {
        var finalFilm = {};
        finalFilm.name = film.title;
        var planets = [];
        for (var url of film.planets) {
            const response = await filmService.getServiceFromUrl(url);
            var planet = {};
            planet.name = response.name;
            planet.terrain = response.terrain;
            planet.gravity = response.gravity;
            planet.diameter = response.diameter;
            planet.population = response.population;
            planets.push(planet);
        }
        var characters = [];
        for (var url of film.characters) {
            const response = await filmService.getServiceFromUrl(url);
            var character = {};
            character.name = response.name;
            character.gender = response.gender;
            character.hair_color = response.hair_color;
            character.skin_color = response.skin_color;
            character.eye_color = response.eye_color;
            character.height = response.height;
            character.homeworld = response.homeworld;
            var species = [];
            for (var url of response.species) {
                const response = await filmService.getServiceFromUrl(url);
                var specie = {};
                specie.name = response.name;
                specie.language = response.language;
                specie.average_height = response.average_height;
                species.push(specie);
            }
            character.species = species;
            characters.push(character);
        }
        var starship = {};
        var lastShipLength = 0;
        for (var url of film.starships) {
            const response = await filmService.getServiceFromUrl(url);
            console.log(response.length);
            if (lastShipLength < response.length) {
                lastShipLength = response.length;
                starship.name = response.name;
                starship.model = response.model;
                starship.manufacturer = response.manufacturer;
                starship.passengers = response.passengers;
            }
        }
        finalFilm.planets = planets;
        finalFilm.characters = characters;
        finalFilm.starships = starship;
        console.log(finalFilm);
        finalFilms.push(finalFilm);
    });
    console.log(finalFilms);
}

getFilms();
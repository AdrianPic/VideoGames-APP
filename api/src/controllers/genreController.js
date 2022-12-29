// Importamos lo necesario
require("dotenv").config();
const axios = require("axios");
const { GENRES_URL } = require("../constants.js")
const { Genre } = require("../db.js");

//Creamos la funcion

async function loadGenres() {
    let apiGenres = await axios.get(GENRES_URL)
        .then(g => {
            let dbGenres = g.data.results.map(async (genre) => {
                await Genre.findOrCreate({
                    where: {
                        id: genre.id,
                        name: genre.name.toLowerCase()
                    }
                })
            })
        })
};

async function getGenres() {
    let genreList = await Genre.findAll();
    return genreList;
}

module.exports = {
    getGenres
}
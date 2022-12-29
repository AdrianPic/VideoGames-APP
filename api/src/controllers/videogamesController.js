require("dotenv").config;
const axios = require("axios");
const { VIDEOGAMES_URL, BASE_URL } = require("../constants.js");
const { API_KEY } = process.env;
const { Videogame } = require("../db.js")



async function getVideogames() {
    let videogamesApi, videogamesDb, arr = [], aux;
    videogamesApi = await axios.get(VIDEOGAMES_URL);
    arr = [...arr, ...videogamesApi.data.results];
    for (let i = 0; i < 5; i++) {
        aux = videogamesApi.data.next;
        videogamesApi = await axios.get(aux);
        arr = [...arr, ...videogamesApi];
    }

    videogamesDb = dbVideogames();
    arr = [...arr, ...videogamesDb];

    return arr;
}


async function search15Videogames(name) {
    let videogamesApi = await axios.get(`${BASE_URL}games?search=${name}&&key=${API_KEY}`)
    let arr = [...videogamesApi.data.results];
    return arr.slice(0, 15);
}

async function searchById(id) {
    let videogamesDb = await dbVideogames();
    let result = videogamesDb.find(game => game.id === id);
    if (result) return result
    try {
        let { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}&`)
        let videogame = {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            image: data.background_image,
            released: data.released,
            rating: data.rating,
            platforms: data.platforms.map(p => p.platform.name),
            genres: data.genres.map(g => g.name),
        }
        return videogame;
    }
    catch (error) {
        return undefined;
    }

}

async function dbVideogames() {
    let videogamesDb = await Videogame.findAll();
    let result = videogamesDb.map(game => {
        return {
            id: game.id,
            name: game.name,
            image: game.image,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map(platform => platform.name),
            genres: game.genres.map(genre => genre.name),
            createInDb: true,
        }
    })
    return result;
}

module.exports = {
    getVideogames,
    search15Videogames,
    searchById
}
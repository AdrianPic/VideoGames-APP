const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getVideogames, search15Videogames, searchById } = require("../controllers/videogamesController.js");
const { getGenres } = require("../controllers/genreController.js");
const { Videogame, Genre } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async function (req, res) {
    let name = req.query.name;
    if (name) {
        let result = await search15Videogames(name);
        if (result)
            res.status(200).json(result);
        else res.status(400).send({ msg: "Videogame not found" });
    } else {
        let result = await getVideogames();
        let allVideogames = result.map(g => {
            return {
                id: g.id,
                name: g.name,
                image: g.image,
                rating: g.rating,
                released: g.released,
                genres: g.genres.map(genre => genre),
                createInDb: game.createInDb ? true : false
            }
        })
    }
})

router.get("/videogames/:id", async function (req, res) {
    let id = req.params.id;
    let result = await searchById(id);
    if (result)
        res.status(200).json(result);
    else res.status(400).send({ msg: "Videogame not found" });
})

router.get("/genres", async function (req, res) {
    let genres = await getGenres();
    res.status(200).json(genres);
})

router.post("/videogames", async function (req, res) {
    let { name, description, image, released, rating, platforms, genres, createInDb } = req.body;
    if (!name || !description || !platforms || !genres) res.status(400).send({ msg: "One or more fields are missing" });
    let videogame = await Videogame.create({
        name: name,
        description: description,
        image: image,
        released: released,
        rating: rating,
        platforms: platforms.map(platform => platform),
        createInDb: createInDb,
    });
    let genreDb = await Genre.findAll({
        where: { name: genres.map(genre => genre) }
    })
    videogame.setGenres(genreDb);
    res.status(201).json('Videogame created');
})

module.exports = router;

export function filterVideogames(filterOptions, videogames) {
    const genres = filterOptions.genres;
    const created = filterOptions.created;
    const ordenation = filterOptions.ordenation;
    let filteredVideogames = videogames;
    if (genres.length > 0) {
        genres.forEach(genre => {
            filteredVideogames = filteredVideogames.filter(videogame => videogame.genres.includes(genre));
        });
    }
    if (created === 'true') {
        filteredVideogames = filteredVideogames.filter(videogame => videogame.createInDb);
    }
    if (created === 'false') {
        filteredVideogames = filteredVideogames.filter(videogame => !videogame.createInDb);
    }
    filteredVideogames = filteredVideogames.map(videogame => {
        if (!videogame.released) { videogame.released = '0000-00-00'; }
        if (!videogame.rating) { videogame.rating = 0; }
        return videogame;
    });
    switch (ordenation) {
        case 'ratingAsc':
            filteredVideogames.sort((a, b) => b.rating - a.rating);
            break;
        case 'ratingDesc':
            filteredVideogames.sort((a, b) => a.rating - b.rating);
            break;
        case 'nameAsc':
            filteredVideogames.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'nameDesc':
            filteredVideogames.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'releasedAsc':
            filteredVideogames.sort((a, b) => a.released.localeCompare(b.released));
            break;
        case 'releasedDesc':
            filteredVideogames.sort((a, b) => b.released.localeCompare(a.released));
            break;
        default:
            break;
    }
    filteredVideogames.sort((a, b) => { if (typeof a.id === 'string') return 1; else return 0 })
    return filteredVideogames;
}

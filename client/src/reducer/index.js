import { filterVideogames } from "./utils";

const initialState = {
    videogames: [],
    filterOptions: {
        genres: [],
        created: 'all',
        ordenation: 'releasedDesc'
    },
    searchVideogames: [],
    filteredSearchVideogames: [],
    filteredVideogames: [],
    genres: [],
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_VIDEOGAMES':
            let videogames = filterVideogames(state.filterOptions, action.payload);
            return {
                ...state,
                videogames: videogames,
                filteredVideogames: videogames,
            }
        case 'FILTER_VIDEOGAMES':
            let filteredVideogames = filterVideogames(action.payload, state.videogames);
            return {
                ...state,
                filteredVideogames: filteredVideogames
            }
        case 'FILTER_SEARCH_VIDEOGAMES':
            let filteredSearchVideogames = filterVideogames(action.payload, state.searchVideogames);
            return {
                ...state,
                filteredSearchVideogames: filteredSearchVideogames
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        case 'SEARCH_VIDEOGAMES':
            return {
                ...state,
                searchVideogames: action.payload,
            }
        case 'POST_VIDEOGAMES':
            return {
                ...state,
            }
        default:
            return state;
    }
};

export default rootReducer;
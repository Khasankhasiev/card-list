import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state: {
        characters: [],
        character: null,
        currentPage: 1,
        totalPages: 0,
        searchQuery: '',
        error: false,
    },
    mutations: {
        SET_CHARACTERS(state, characters) {
            state.characters = characters;
        },
        SET_CHARACTER(state, character) {
            state.character = character;
        },
        SET_TOTAL_PAGES(state, totalPages) {
            state.totalPages = totalPages;
        },
        SET_CURRENT_PAGE(state, currentPage) {
            state.currentPage = currentPage;
        },
        SET_SEARCH_QUERY(state, query) {
            state.searchQuery = query;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
    },
    actions: {
        async fetchCharacters({ commit, state }, { page = 1, query = '' }) {
            try {
                const url = query
                    ? `https://rickandmortyapi.com/api/character?name=${query}&page=${page}`
                    : `https://rickandmortyapi.com/api/character?page=${page}`;
                const response = await axios.get(url);

                commit('SET_CHARACTERS', response.data.results);
                commit('SET_TOTAL_PAGES', response.data.info.pages);
                commit('SET_CURRENT_PAGE', page);
                commit('SET_ERROR', false);
            } catch (error) {
                commit('SET_CHARACTERS', []);
                commit('SET_TOTAL_PAGES', 0);
                commit('SET_CURRENT_PAGE', 1);
                commit('SET_ERROR', true);
            }
        },
        async fetchCharacter({ commit }, id) {
            try {
                const response = await axios.get(
                    `https://rickandmortyapi.com/api/character/${id}`
                );
                commit('SET_CHARACTER', response.data);
            } catch (error) {
                commit('SET_CHARACTER', null);
            }
        },
        updateSearchQuery({ commit, dispatch }, query) {
            commit('SET_SEARCH_QUERY', query);
            dispatch('fetchCharacters', { page: 1, query });
        },
        goToPage({ dispatch, state }, page) {
            dispatch('fetchCharacters', { page, query: state.searchQuery });
        },
    },
    getters: {
        characters: state => state.characters,
        character: state => state.character,
        currentPage: state => state.currentPage,
        totalPages: state => state.totalPages,
        searchQuery: state => state.searchQuery,
        error: state => state.error,
    },
});

export default store;

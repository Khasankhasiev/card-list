<template>
    <div class="container">
        <search-bar @search="handleSearch" />
        <div class="character-list">
            <div
                v-if="characters.length"
                v-for="character in characters"
                :key="character.id"
                class="character-card"
            >
                <img :src="character.image" alt="Character Image" />
                <h3>{{ character.name }}</h3>
                <router-link :to="`/character/${character.id}`"
                    >View Details</router-link
                >
            </div>
            <p v-else v-if="searchQuery || error">Nothing found</p>
        </div>
        <Pagination />
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SearchBar from './SearchBar.vue';
import Pagination from './Pagination.vue';

export default {
    components: { SearchBar, Pagination },
    computed: {
        ...mapState(['characters', 'currentPage', 'searchQuery', 'error']),
    },
    methods: {
        ...mapActions(['fetchCharacters', 'updateSearchQuery', 'goToPage']),
        handleSearch(query) {
            this.updateSearchQuery(query);
        },
    },
    mounted() {
        this.fetchCharacters({ page: this.currentPage });
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.character-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.character-card {
    margin: 10px;
    width: 200px;
    text-align: center;
    border: 1px solid #ddd;
    padding: 16px;
}
.character-card img {
    width: 100%;
    height: auto;
}
</style>

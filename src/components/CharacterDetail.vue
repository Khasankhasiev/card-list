<template>
    <div class="character-detail">
        <div v-if="character">
            <img :src="character.image" alt="Character Image" />
            <h2>{{ character.name }}</h2>
            <p><strong>Status:</strong> {{ character.status }}</p>
            <p><strong>Species:</strong> {{ character.species }}</p>
            <p><strong>Gender:</strong> {{ character.gender }}</p>
            <p><strong>Origin:</strong> {{ character.origin.name }}</p>
            <p><strong>Location:</strong> {{ character.location.name }}</p>
            <router-link :to="`/`">Back</router-link>
        </div>

        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['character']),
    },
    methods: {
        ...mapActions(['fetchCharacter']),
    },
    async created() {
        const id = this.$route.params.id;
        await this.fetchCharacter(id);
    },
};
</script>

<style scoped>
.character-detail {
    text-align: center;
    padding: 20px;
}
.character-detail img {
    width: 200px;
    height: auto;
}
</style>

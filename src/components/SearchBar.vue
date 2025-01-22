<template>
    <input
        type="text"
        v-model="query"
        @input="debouncedOnSearch"
        placeholder="Search for characters"
    />
</template>

<script>
import { debounce } from 'lodash';

export default {
    data() {
        return { query: '' };
    },
    methods: {
        debouncedOnSearch: debounce(function () {
            this.$emit('search', this.query);
        }, 1000),
    },
    watch: {
        query(value) {
            if (value === '') {
                this.debouncedOnSearch();
            }
        },
    },
    beforeDestroy() {
        this.debouncedOnSearch.cancel();
    },
};
</script>

<style scoped>
input {
    margin-bottom: 20px;
    padding: 10px;
    width: 90%;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}
</style>

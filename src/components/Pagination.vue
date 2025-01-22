<template>
    <div class="pagination">
        <button :disabled="currentPage <= 1" @click="prevPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage >= totalPages" @click="nextPage">
            Next
        </button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState(['currentPage', 'totalPages']),
    },
    methods: {
        ...mapActions(['goToPage']),
        prevPage() {
            if (this.currentPage > 1) this.goToPage(this.currentPage - 1);
        },
        nextPage() {
            if (this.currentPage < this.totalPages)
                this.goToPage(this.currentPage + 1);
        },
    },
};
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
button {
    margin: 0 10px;
    padding: 5px 10px;
}
</style>

<template>
    <span class="sort-indicator">
        <span v-if="isActive">
            <i v-if="sortDirection === 'asc'" class="fa fa-arrow-up"></i>
            <i v-else class="fa fa-arrow-down"></i>
        </span>
    </span>
</template>

<script>
export default {
    props: {
        field: {
            type: String,
            required: true,
        },
        currentSortField: {
            type: String,
            required: true,
        },
        sortDirection: {
            type: String,
            required: true,
        },
    },
    computed: {
        isActive() {
            return this.field === this.currentSortField;
        },
    },
};
</script>

<style scoped>
.sort-indicator {
    margin-left: 5px;
    font-size: 12px;
    vertical-align: middle;
}
</style>

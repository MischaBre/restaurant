<template>
    <div class="d-flex flex-row align-items-center rest-list-row">
        <b-avatar :text="initialChar" :variant="restaurant.visited ? 'secondary' : 'primary'" class="m-2"></b-avatar>
        <div class="m-2 h2 flex-fill">{{ restaurant.name }}</div>
        <b-badge v-for="tag of restaurant.tags" :key="restaurant.id + tag" class="m-1">{{ tag }}</b-badge>
        <b-form-rating v-if="restaurant.rating" v-model="rating" readonly no-border inline stars="5" class="m-2"></b-form-rating>
        <div class="m-2">{{ neighborhood }}</div>
    </div>
</template>

<script>
    export default {
        name: 'restaurantListItem',
        props: [
            'restaurant'
        ],
        computed: {
            initialChar() {
                return this.restaurant.name.charAt(0);
            },
            rating() {
                return this.restaurant.rating / 2 | 0;
            },
            neighborhood() {
                if (!this.restaurant.neighborhood) {
                    return '';
                }
                const nhs = this.restaurant.neighborhood.sort((a,b) => a.level - b.level).map(x => x.name);
                return nhs.join(', ');
            }
        }
    }
</script>

<style scoped>
    .rest-list-row {
        width:100%;
    }
</style>
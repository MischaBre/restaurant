<template>
    <div class="rest-list-row">
        <div class="d-flex flex-wrap flex-row align-items-center">
            <b-avatar :text="initialChar" :variant="restaurant.visited ? 'secondary' : 'primary'" class="mx-2"></b-avatar>
            <div class="m-2 h4 flex-fill" :class="{'text-primary': !restaurant.visited}">{{ restaurant.name }}</div>
            <div class="mx-2">{{ neighborhood }}</div>
        </div>
        <div>
            <b-badge v-for="tag of restaurant.tags" :key="restaurant.id + tag" class="mx-1">{{ tag }}</b-badge>
        </div>
        <b-form-rating v-if="restaurant.rating" v-model="restaurant.rating" readonly no-border inline :variant="restaurant.rating > 5 ? 'success' : 'danger'" stars="5" ></b-form-rating>
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
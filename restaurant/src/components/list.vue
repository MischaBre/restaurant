<template>
    <div>
        <b-input-group class="d-flex align-items-center">
            <template #prepend>
                <b-icon icon="search" class="border-circle m-2"/>
            </template>
            <b-form-input v-model="filterString" debounce="500" placeholder="Filter Restaurants..." class="rounded-pill mx-2"></b-form-input>
            <template #append>
                <b-button pill :variant="maxFilterBar ? 'secondary' : 'outline-secondary'" class="ml-2" @click="maximizeFilterBar">
                    <b-icon :icon="maxFilterBar ? 'chevron-double-up' : 'chevron-double-down'"/>
                </b-button>
            </template>
        </b-input-group>
        <b-collapse id="filterBar" v-model="maxFilterBar">
            <div class="d-flex flex-row align-items-center justify-content-end">
                <b-form-rating v-if="!filterVisited" show-clear id="filterRating" v-model="filterRating" inline class="m-2"></b-form-rating> 
                <b-form-checkbox id="filterVisited" v-model="filterVisited" class="m-3">Show only <span class="text-primary">new</span></b-form-checkbox>
            </div>
        </b-collapse>
        <b-list-group class="mt-4">
            <b-list-group-item v-for="restaurant of restaurants" :key="restaurant.id" class="d-flex align-items-center">
                <restaurant-list-item :restaurant="restaurant"></restaurant-list-item>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
    import gql from 'graphql-tag'
    import restaurantListItem from './restaurant-list-item.vue';
    export default {
        name: 'restList',
        components: {
            'restaurant-list-item': restaurantListItem
        },
        data() {
            return {
                restaurants: [],
                filterString: null,
                filterVisited: false,
                filterRating: 0,
                maxFilterBar: false
            };
        },
        //computed: {
        //    restaurants() {
        //        return this.$store.getters.restaurants;
        //    }
        //},
        //mounted() {
        //    this.$store.dispatch('fetchAllRestaurantsAsync');
        //},
        methods: {
            maximizeFilterBar() {
                this.maxFilterBar = !this.maxFilterBar;
            }
        },
        apollo: {
            restaurants: {
                query: gql`query restaurants($keyword: String, $onlyNew: Boolean, $rating: Int) {
                    restaurants: restaurantByKeyword(keyword: $keyword, onlyNew: $onlyNew, rating: $rating) {
                        id,
                        name,
                        added,
                        visited,
                        rating,
                        tags,
                        neighborhood {
                            id,
                            name,
                            level
                        },
                        notes
                    }
                }`,
                variables() {
                    return {
                        keyword: this.filterString,
                        onlyNew: this.filterVisited,
                        rating: this.filterRating * 2
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>
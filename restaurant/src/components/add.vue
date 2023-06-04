<template>
    <div class="container-sm d-flex flex-column">
        <h3 class="m-2">Add a Restaurant</h3>
        <b-form @submit="onSubmit" @reset="onReset" class="d-flex flex-column">
            <b-card bg-variant="light" class="mb-3">
                <h5>Mandatory fields:</h5>
                <b-form-group 
                    id="input-name-group"
                    label="Restaurant Name:"
                    label-for="input-name"
                    description="The Name of the Restaurant. (Only Letters and Numbers allowed)">
                    <b-form-input
                        id="input-name"
                        v-model="restaurant.name"
                        type="text"
                        placeholder="Enter Name...">
                    </b-form-input>
                </b-form-group>
                <b-form-group 
                    id="input-tags-group"
                    label="Restaurant Tags:"
                    label-for="input-tags"
                    description="Enter up to five Tags seperated by Space or Comma">
                    <b-form-tags
                        id="input-tags"
                        v-model="restaurant.tags"
                        placeholder="Enter Tags..."
                        separator=" ,;"
                        :limit="5"
                        remove-on-delete>
                    </b-form-tags>
                </b-form-group>
                <div class="d-flex flex-column my-2">
                <b-button v-b-modal.modal-map>Pick a Location</b-button>
                    {{ restLocationCoords || 'No Location picked!' }}
                </div>
                <b-modal id="modal-map" title="Pick a Location">
                    <addMap class="addMap"></addMap>
                </b-modal>
            </b-card>
            <b-card bg-variant="light" class="mb-3">
                <h5>Optional fields:</h5>
                <b-form-group 
                    id="input-visited-group"
                    label="Visited on:"
                    label-for="input-visited"
                    description="When did you visit the restaurant?">
                    <b-form-datepicker
                        id="input-visited-date"
                        v-model="restaurant.visited"
                        today-button
                        reset-button
                        close-button
                        locale="de"
                        required>
                    </b-form-datepicker>
                </b-form-group>
                <b-form-group 
                    id="input-rating-group"
                    label="Rating:"
                    label-for="input-rating"
                    description="Pick a rating for your visit.">
                    <b-form-rating
                        :disabled="!restaurant.visited"
                        id="input-rating"
                        v-model="restaurant.rating"
                        show-clear>
                    </b-form-rating>
                </b-form-group>
                <b-form-group 
                    id="input-notes-group"
                    label="Notes:"
                    label-for="input-notes"
                    description="Additional notes.">
                    <b-form-textarea
                        id="input-notes"
                        v-model="restaurant.notes"
                        placeholder="Enter notes..."
                        rows="2"
                        max-rows="5">
                    </b-form-textarea>
                </b-form-group>
            </b-card>
            <b-alert :show="inputState === false" variant="danger">Invalid Input. Fill out all mandatory fields.</b-alert>
            <div class="align-self-end">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </div>
        </b-form>
        
    </div>
</template>

<script>
    import addMap from './addMap.vue';
    import gql from 'graphql-tag'
    export default {
        name: 'restAdd',
        components: {
            'addMap': addMap
        },
        data() {
            return {
                restaurant: {
                    name: null,
                    tags: [],
                    geolocation: {type: 'Point', coordinates: [-105.01621, 39.57422]},
                    neighborhood: 'Testort',
                    visited: null,
                    rating: null,
                    notes: null
                },
                show: true,
                inputState: null,
            };
        },
        computed: {
            restLocationCoords() {
                if (!this.restaurant.geolocation) {
                    return null;
                }
                return this.restaurant.geolocation.coordinates.join(',');
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault();
                if (!this.validateInput(this.restaurant)) {
                    this.inputState = false;
                    return;
                }
                this.inputState = true;
                this.addRestaurant(this.restaurant);
                alert(JSON.stringify(this.restaurant))
            },
            onReset(event) {
                event.preventDefault();

                this.restaurant = {
                    name: null,
                    tags: [],
                    geolocation: {type: 'Point', coordinates: [-105.01621, 39.57422]},
                    neighborhood: 'Testort',
                    visited: null,
                    rating: null,
                    notes: null
                };
                this.inputState = null;

                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            },
            validateInput(restaurant) {
                if (!restaurant.name || this.isNotAlphaNum(restaurant.name)) {
                    return false;
                }
                if (!restaurant.tags) {
                    return false;
                }
                for (const tag of restaurant.tags) {
                    if (this.isNotAlphaNum(tag)) {
                        return false;
                    }
                }
                if (!restaurant.geolocation) {
                    return false;
                }
                if (!restaurant.neighborhood) {
                    return false;
                }
                return true;
            },
            isNotAlphaNum(testString) {
                return /[^a-zA-Z0-9]/.test(testString);
            },
            addRestaurant(restaurant) {
                const visitedTimeStamp = Date.now()
                const geolocationJSONString = JSON.stringify(restaurant.geolocation);
                alert(geolocationJSONString);
                this.$apollo.mutate({
                    mutation: gql`
                        mutation(
                            $name: String!,
                            $tags: [String!]!,
                            $geolocation: JSONString!,
                            $neighborhood: String!,
                            $visited: DateTime,
                            $rating: Int,
                            $notes: String
                        ) {
                            createRestaurant (
                                name: $name,
                                tags: $tags,
                                geolocation: $geolocation,
                                neighborhood: $neighborhood,
                                visited: $visited,
                                rating: $rating,
                                notes: $notes
                            ) {
                                restaurant {
                                    id,
                                    name,
                                    tags,
                                    geolocation,
                                    neighborhood {
                                        name,
                                        level
                                    },
                                    visited,
                                    rating,
                                    notes
                                }
                            }
                        }
                    `,
                    variables: {
                        name: restaurant.name,
                        tags: restaurant.tags,
                        geolocation: geolocationJSONString,
                        neighborhood: restaurant.neighborhood,
                        visited: new Date(restaurant.visited),
                        rating: restaurant.rating,
                        notes: restaurant.notes || ''
                    }
                }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.error(error);
                });
            },
        }

    }
</script>

<style scoped>
    .addMap {
        height: 70vh;
    }
</style>
import { apolloClient } from '../../../apollo';
import { restaurantQuery, restaurantAdd } from './gql';

const fetchRestaurants = async ({commit}, {keyword, onlyNew, rating}) => {
    const response = await apolloClient.query({
        query: restaurantQuery,
        variables: {
            keyword: keyword,
            onlyNew: onlyNew,
            rating: rating || 0
        },
    })
    commit('restaurants', response.data.restaurants);
};

const addRestaurant = async ({commit}, {restaurant}) => {
    const geolocationJSONString = JSON.stringify(restaurant.geolocation);
    apolloClient.mutate({
        mutation: restaurantAdd,
        variables: {
            name: restaurant.name,
            tags: restaurant.tags,
            geolocation: geolocationJSONString,
            neighborhood: restaurant.neighborhood,
            visited: restaurant.visited && new Date(restaurant.visited),
            rating: restaurant.rating,
            notes: restaurant.notes || ''
        }
    }).then(({data}) => {
        console.log(data.createRestaurant);
        if (data.createRestaurant.ok) {
            alert('Juhu');
        }
        
    }).catch((error) => {
        console.error(error);
    });
}

export default {
    fetchRestaurants,
    addRestaurant
};
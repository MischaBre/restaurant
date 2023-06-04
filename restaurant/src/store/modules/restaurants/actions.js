import gql from 'graphql-tag';
import { apolloClient } from '../../../apollo';

const restaurantQuery = gql`query restaurants($keyword: String, $onlyNew: Boolean, $rating: Int) {
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
}`;

const fetchRestaurants = async ({commit}, keyword, onlyNew, rating) => {
    const response = await apolloClient.query({
        query: restaurantQuery,
        variables: {
            keyword: keyword,
            onlyNew: onlyNew,
            rating, rating
        },
        update: data => data.resaurants
    })
    commit('restaurants', response.data);
};

export default {
    fetchRestaurants,
};
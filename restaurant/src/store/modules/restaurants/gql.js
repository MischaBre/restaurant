import gql from 'graphql-tag';

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
const restaurantAdd = gql`
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
        ok
    }
}`;

export { restaurantQuery, restaurantAdd };
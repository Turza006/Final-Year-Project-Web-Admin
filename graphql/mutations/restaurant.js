import gql from 'graphql-tag'

export const EDIT_RESTAURANT = gql`
  mutation EditRestaurant ($payload: RestaurantInput, $restaurantId: ID) {
    EditRestaurant (payload: $payload, restaurantId: $restaurantId) {
      msg
      code
      jwt
    }
  }`

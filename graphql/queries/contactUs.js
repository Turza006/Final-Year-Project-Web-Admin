import gql from 'graphql-tag'

export const GET_ALL_CONTACT_US_BY_RESTAURANT_ID = gql`
  query GetContactUsByRestaurantId(
    $RestaurantId: ID
    $limit: Int
    $offset: Int
    $status: String
  ) {
    GetContactUsByRestaurantId(
      RestaurantId: $RestaurantId
      limit: $limit
      offset: $offset
      status: $status
    ) {
      ContuctUsS {
        firstName
        lastName
        email
        massage
        additionalDetails
        status
        createdAt
      }
      count
      code
      msg
    }
  }
`

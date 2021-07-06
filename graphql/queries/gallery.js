import gql from 'graphql-tag'

export const GET_ALL_GALLERY_BY_RESTAURANT_ID = gql`
  query GetAllGalleryByRestaurantId(
    $RestaurantID: ID
    $limit: Int
    $offset: Int
  ) {
    GetAllGalleryByRestaurantId(
      RestaurantID: $RestaurantID
      limit: $limit
      offset: $offset
    ) {
      Galleries {
        id
        description
        type
        image
        status
      }
      count
      msg
      code
    }
  }
`

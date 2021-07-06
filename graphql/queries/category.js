// Menu Category

import gql from 'graphql-tag'

export const SINGLE_RESTAURANT_MENU_CATEGORY = gql`
  query SingleResturantMenuCategory(
    $restaurantId: ID
    $status: DefaultStatus
    $limit: Int
    $offset: Int
  ) {
    SingleResturantMenuCategory(
      restaurantId: $restaurantId
      status: $status
      limit: $limit
      offset: $offset
    ) {
      MenuCategories {
        id
        category
        status
        priority
      }
      count
      code
      msg
    }
  }
`

export const SINGLE_MENU_CATEGORY = gql`
  query SingleMenuCategory($menucategoryID: ID) {
    SingleMenuCategory(menucategoryID: $menucategoryID) {
      category
      status
      priyority
      msg
      code
    }
  }`

import gql from 'graphql-tag'

export const SHOW_ALL_SPECIAL_MENU = gql`
  query ShowAllSpecialMenu(
    $restaurantId: ID
    $status: String
    $limit: Int
    $offset: Int
  ) {
    ShowAllSpecialMenu(
      restaurantId: $restaurantId
      status: $status
      limit: $limit
      offset: $offset
    ) {
      specialMenu {
        id
        menuUniqueNumber
        name
        image
        detailsInfo
        price
        manufactureDate
        enableDayInWeek
        hasVariant
        variant{
          variantName
          price
        }
        expiryDate
        discount
        status
        serveTime
        restaurant{
          id
        }
        createdAt
        updatedAt
        msg
        code
      }
      count
      code
      msg
    }
  }
`

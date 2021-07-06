import gql from 'graphql-tag'

export const SHOW_SINGLE_RESTAURANT_FOOD_ITEMS = gql`
  query SingleRestaurantFoodItems(
    $RestaurantID: ID
    $status: String
    $limit: Int
    $offset: Int
  ) {
    SingleRestaurantFoodItems(
      RestaurantID: $RestaurantID
      status: $status
      limit: $limit
      offset: $offset
    ) {
      FoodItems {
        id
        menuUniqueNumber
        name
        image
        detailsInfo
        price
        menuCategory{
            id
            category
        }
        manufactureDate
        foodType{
          id
          typeName
        }
        foodSubType{
          id
          subTypeName
        }
        hasVariant
        variant {
          variantName
          price
        }
        expiryDate
        discount
        status
        serveTime
        isSpecial
        isOffered
        isOccasional
        createdAt
        updatedAt
      }
      count
      code
      msg
    }
  }
`

export const SINGLE_FOOD_ITEM = gql`
  query SingleFoodItem($FoodItemId: ID) {
    SingleFoodItem(FoodItemId: $FoodItemId) {
      id
      menuUniqueNumber
      name
      image
      detailsInfo
      price
      manufactureDate
      foodType{
        id
        typeName
      }
      foodSubType{
        id
        subTypeName
      }
      hasVariant
      variant{
        variantName
        price
      }
      expiryDate
      discount
      status
      menuCategory{
        id
        category
      }
      serveTime
      isSpecial
      isOffered
      isOccasional
      msg
      code
    }
  }`

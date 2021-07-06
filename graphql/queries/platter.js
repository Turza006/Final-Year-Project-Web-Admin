import gql from 'graphql-tag'

export const SHOW_SINGLE_RESTAURANT_PLATTER_ITEMS = gql`
  query SingleRestaurantPlatterItems(
    $RestaurantID: ID
    $status: String
    $limit: Int
    $offset: Int
  ) {
    SingleRestaurantPlatterItems(
      RestaurantID: $RestaurantID
      status: $status
      limit: $limit
      offset: $offset
    ) {
      PlatterItems{
        id
        menuUniqueNumber
        name
        image
        detailsInfo
        price
        menuCategory{
          id
        }
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
        quantity
        manufactureDate
        expiryDate
        discount
        status
        serveTime
        items{
          foodItem {
            id
            menuUniqueNumber
            name
            image
            detailsInfo
            price
            discount
            discount
            hasVariant
            variant {
              variantName
              price
            }
          }
          qty
        }
        updatedAt
      }
      count
      code
      msg
    }
  }
`

export const GET_ALL_PLATTER_ITEM_BY_STATUS = gql`
  query GetAllPlatterItemByStatus($status: String, $limit: Int, $offset: Int) {
    GetAllPlatterItemByStatus(status: $status, limit: $limit, offset: $offset) {
      PlatterItems {
        id
        platterMenuUniqueNumber
        platterName
        platterImage
        platterDetailsInfo
        platterPrice
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
        platterQuantity
        platterManufactureDate
        platterExpiryDate
        platterDiscount
        platterStatus
        platterServeTime
        platterItems{
          id
          menuUniqueNumber
          name
          image
          detailsInfo
          price
          hasVariant
          variant{
            variantName
            price
          }
        }
      }
    }
  }
`

export const SINGLE_PLATTER_ITEM = gql`
  query SinglePlatterItem($PlatterItemId: ID) {
    SinglePlatterItem(PlatterItemId: $PlatterItemId) {
      id
      menuUniqueNumber
      name
      image
      menuCategory{
        id
        category
      }
      detailsInfo
      price
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
      quantity
      manufactureDate
      expiryDate
      discount
      status
      serveTime
      items {
        foodItem {
          id
          menuUniqueNumber
          name
          image
          detailsInfo
          price
          hasVariant
          variant {
            variantName
            price
          }
        }
        qty
      }
      updatedAt
      createdAt
      code
      msg
    }
  }
`

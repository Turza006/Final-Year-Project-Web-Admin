import gql from 'graphql-tag'

export const GET_ALL_TABLE_BY_RESTAURANT_STATUS = gql`
  query GetAllTableByRestaurentIAndStatus($RestaurantId: ID, $status: String) {
    GetAllTableByRestaurentIAndStatus(
      RestaurantId: $RestaurantId
      status: $status
    ) {
      Tables {
        id
        tableImg
        tableType
        tableNo
        tableName
        currentStatus
        Restaurant{
          id
        }
        tableChairNo
        orderOngoing{
          id
          orderNo
          totalPrice
        }
        floor{
          floorNo
          image
        }
        Reservation{
          Reservation{
            name
          }
          time
        }
        status
      }
      msg
      code
    }
  }
`

export const TABLE_TYPE_BY_RESTAURANT_ID = gql`
  query TableTypeByResturentId($RestaurantId: ID, $status: String) {
    TableTypeByResturentId(
      RestaurantId: $RestaurantId
      status: $status
    ) {
      TableType
      msg
      code
    }
  }`

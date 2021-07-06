import gql from 'graphql-tag'

export const CREATE_TABLE = gql`
  mutation CreateTable($payload: TableInput){
    CreateTable(payload: $payload){
      msg
      code
    }
  }
`

export const GET_ALL_TABLE_BY_RESTAURANT_ID_AND_STATUS = gql`
  query GetAllTableByRestaurentIAndStatus($RestaurantId: ID, $status: String, $floorName: String) {
    GetAllTableByRestaurentIAndStatus(
      RestaurantId: $RestaurantId
      status: $status
      floorName: $floorName
    ) {
      Tables {
        id
        tableImg
        tableType
        tableNo
        tableName
        currentStatus
        tableChairNo
        orderOngoing{
          id
          orderNo
          totalPrice
        }
        Restaurant{
          id
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
  }`

export const EDIT_TABLE = gql`
  mutation EditTable($payload: TableInput, $tableId: ID){
    EditTable(payload: $payload, tableId: $tableId){
      msg
      code
      jwt
    }
  }`

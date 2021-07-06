import gql from 'graphql-tag'

export const SHOW_ALL_ORDER_BY_RESTAURANT_ID = gql`
  query ShowAllOrderByRestaurantID($limit: Int, $offset: Int, $RestaurantID: ID, $Status: OrderStatus) {
    ShowAllOrderByRestaurantID(limit: $limit, offset: $offset, RestaurantID: $RestaurantID, Status: $Status) {
      Orders {
        id
        orderNo
        adminSelectedTable {
          id
          tableNo
          tableName
          tableType
        }
        orderedItem {
          foodItem {
            name
          }
          platterItem {
            menuUniqueNumber
            name
          }
          qty
        }
        customerName
        customerPhoneNo
        discount
        vat
        serviceFee
        otherFeeName
        otherFeeAmount
        totalPrice
        paymentMethod
        status
        updatedAt
        createdAt
      }
      count
      msg
      code
    }
  }
`

export const SHOW_SINGLE_ORDER_DETAILS = gql`
  query ShowSingleOrderDetails($OrderId: ID) {
    ShowSingleOrderDetails(OrderId: $OrderId) {
      id
      orderNo
      adminSelectedTable {
        id
        tableNo
        tableName
        tableType
      }
      reservationTableType {
        tableType
        qty
      }
      customerName
      customerPhoneNo
      customerEmail
      customerAddress
      orderedItem {
        foodItem {
          id
          name
          image
        }
        platterItem {
          id
          menuUniqueNumber
          name
          image
        }
        qty
        price
        discount
      }
      serviceFee
      discount
      vat
      otherFeeName
      otherFeeAmount
      totalPrice
      paymentMethod
      status
      updatedAt
      createdAt
      msg
      code
    }
  }
`

import gql from 'graphql-tag'

export const ALL_RESERVATION_BY_STATUS = gql`
  query AllReservationByStatus(
    $RestaurantId: ID
    $Status: ReservationStatus
    $limit: Int
    $offset: Int
  ) {
    AllReservationByStatus(
      RestaurantId: $RestaurantId
      Status: $Status
      limit: $limit
      offset: $offset
    ) {
      Reservations {
        _id
        reservationId
        adminSelectedTable {
          id
          tableNo
          tableType
          tableChairNo
        }
        reservationTableType {
          tableType
          qty
        }
        name
        email
        phoneNumber
        totalPerson
        selectDate
        selectTime
        status
        adminComment
        userComment
        reservationId
      }
      count
      msg
      code
    }
  }
`

export const GET_SINGLE_RESERVATION_BY_ID = gql`
  query SingleReservationDetails($ReservationId: ID) {
    SingleReservationDetails(ReservationId: $ReservationId) {
      _id
      adminSelectedTable {
        id
        tableNo
      }
      reservationTableType {
        tableType
        qty
      }
      name
      email
      phoneNumber
      totalPerson
      selectDate
      selectTime
      userComment
      adminComment
      msg
      code
    }
  }
`

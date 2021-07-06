import gql from 'graphql-tag'

export const CREATE_RESERVATION = gql`
  mutation createReservation($payload: ReservationInput) {
    createReservation(payload: $payload) {
      msg
      code
    }
  }
`

export const EDIT_RESERVATION = gql`
  mutation EditReservation($payload: ReservationInput, $ReservationId: ID) {
    EditReservation(payload: $payload, ReservationId: $ReservationId) {
      msg
      code
    }
  }
`

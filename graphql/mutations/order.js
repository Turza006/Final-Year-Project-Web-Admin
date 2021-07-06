import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
  mutation CreateOrder($payload: OrderInput) {
    CreateOrder(payload: $payload) {
      msg
      code
      jwt
    }
  }`

export const EDIT_ORDER = gql`
  mutation EditOrder($payload: OrderInput, $orderId: ID) {
    EditOrder(payload: $payload, orderId: $orderId) {
      msg
      code
    }
  }
`

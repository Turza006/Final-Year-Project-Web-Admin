import gql from 'graphql-tag'

export const CREATE_PLATTER_ITEM = gql`
  mutation CreatePlatterItem ($payload: PlatterItemInput) {
    CreatePlatterItem (payload: $payload) {
      msg
      code
      jwt
    }
  }`

export const EDIT_PLATTER_ITEM = gql`
  mutation EditPlatterItem($payload: PlatterItemInput, $platterItemId: ID) {
    EditPlatterItem(payload: $payload, platterItemId: $platterItemId) {
      msg
      code
      jwt
    }
  }
`

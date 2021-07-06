import gql from 'graphql-tag'

export const CREATE_TYPE = gql`
  mutation CreateNewType($payload: TypeInput) {
    CreateNewType(payload: $payload) {
      msg
      code
    }
  }
`

export const EDIT_TYPE = gql`
  mutation UpdateType($payload: TypeInput, $typeId: ID) {
    UpdateType(payload: $payload, typeId: $typeId) {
      msg
      code
    }
  }
`

export const DELETE_TYPE = gql`
  mutation DeleteType($typeId: ID) {
    DeleteType(typeId: $typeId) {
      msg
      code
    }
  }
`

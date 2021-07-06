import gql from 'graphql-tag'

export const CREATE_SUB_TYPE = gql`
  mutation CreateNewSubType($payload: SubTypeInput) {
    CreateNewSubType(payload: $payload) {
      msg
      code
    }
  }
`

export const EDIT_SUB_TYPE = gql`
  mutation UpdateSubType($payload: SubTypeInput, $subTypeId: ID) {
    UpdateSubType(payload: $payload, subTypeId: $subTypeId) {
      msg
      code
    }
  }
`

export const DELETE_SUB_TYPE = gql`
  mutation DeleteSubType($subTypeId: ID) {
    DeleteSubType(subTypeId: $subTypeId) {
      msg
      code
    }
  }
`

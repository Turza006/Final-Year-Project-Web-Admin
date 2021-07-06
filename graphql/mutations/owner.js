import gql from 'graphql-tag'

export const OWNER_PROFILE_EDIT = gql`
  mutation OwnerProfileEdit($ownerId: ID, $payload: OwnerInput) {
    OwnerProfileEdit(ownerId: $ownerId, payload: $payload) {
      msg
      code
    }
  }
`

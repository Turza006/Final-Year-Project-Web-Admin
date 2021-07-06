import gql from 'graphql-tag'

export const CREATE_STAFF = gql`
  mutation CreateStaff($payload: StaffInput){
    CreateStaff(payload: $payload) {
      msg
      code
    }
  }`

export const EDIT_STAFF = gql`
  mutation EditStaff ($payload: StaffInput, $staffId: ID) {
    EditStaff (payload: $payload, staffId: $staffId) {
      msg
      code
      jwt
    }
  }`

export const EDIT_STAFF_STATUS = gql`
  mutation EditStaffStatus($status: String, $staffId: ID) {
    EditStaffStatus(status: $status, staffId: $staffId) {
      msg
      code
    }
  }
`

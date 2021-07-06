import gql from 'graphql-tag'

export const OWNER_SELF = gql`
  query{
    OwnerSelf{
      id
      firstName
      lastName
      email
      phoneNo
      profilePic
      isEmailVerified
      isPhoneVerified
      billingType
      billingAddress
      billingNumber
      createdAt
      updatedAt
      msg
      code
    }
  }`

export const OWNER_CHANGE_PASSWORD = gql`
  mutation OwnerChangePassword ($oldPassword: String, $newPassword: String){
    OwnerChangePassword (oldPassword: $oldPassword, newPassword: $newPassword){
      msg
      code
      jwt
    }
  }`

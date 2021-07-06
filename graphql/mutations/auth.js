import gql from 'graphql-tag'

export const OWNER_LOGIN = gql`
  mutation OwnerLogin ($email: String, $password: String, $deviceToken: String) {
    OwnerLogin (email: $email, password: $password, deviceToken: $deviceToken) {
      id
      firstName
      lastName
      email
      phoneNo
      profilePic
      isEmailVerified
      isPhoneVerified
      billingType
      billingNumber
      billingAddress
      createdAt
      updatedAt
      msg
      code
      jwt
    }
  }`

export const OWNER_EMAIL_VERIFICATION = gql`
  mutation OwnerEmailVerification ($token: String) {
    OwnerEmailVerification (token: $token) {
      id
      firstName
      lastName
      email
      phoneNo
      profilePic
      isEmailVerified
      isPhoneVerified
      billingType
      billingNumber
      billingAddress
      createdAt
      updatedAt
      msg
      code
      jwt
    }
  }`

export const FORGOT_PASSWORD_REQUEST = gql`
  mutation OwnerForgotPasswordRequest ($email: String) {
    OwnerForgotPasswordRequest (email: $email) {
      msg
      code
      jwt
    }
  }`

export const OWNER_PASSWORD_RESET_TOKEN_VERIFY = gql`
  mutation OwnerPasswordResetTokenVerify ($token: String) {
    OwnerPasswordResetTokenVerify (token: $token) {
      msg
      code
      jwt
    }
  }`

export const OWNER_CREATE_NEW_PASSWORD = gql`
  mutation OwnerResetPasswordChanging ($password: String){
    OwnerResetPasswordChanging (password: $password){
      msg
      code
      jwt
    }
  }`

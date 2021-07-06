import gql from 'graphql-tag'

export const CREATE_SPECIAL_MENU = gql`
  mutation CreatePlatterItem ($payload: SpecialFoodItemInput) {
    CreateSpecialMenu (payload: $payload) {
      msg
      code
      jwt
    }
  }
`

import gql from 'graphql-tag'

export const CREATE_FOOD_ITEM = gql`
  mutation CreateFoodItem ($payload: FoodItemInput) {
    CreateFoodItem (payload: $payload) {
      msg
      code
    }
  }`

export const EDIT_FOOD_ITEM = gql`
  mutation EditFoodItem($payload: FoodItemInput, $foodItemId: ID){
    EditFoodItem(payload: $payload, foodItemId: $foodItemId){
      msg
      code
    }
  }`

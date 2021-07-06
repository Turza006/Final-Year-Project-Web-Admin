import gql from 'graphql-tag'

export const CREATE_MENU_CATEGORY = gql`
  mutation AddMenuCategory($payload: MenuCategoryInput) {
    AddMenuCategory(payload: $payload) {
      msg
      code
    }
  }
`

export const EDIT_MENU_CATEGORY = gql`
  mutation EditMenuCategory($menuCategoryId: ID, $payload: MenuCategoryInput) {
    EditMenuCategory(menuCategoryId: $menuCategoryId, payload: $payload) {
      msg
      code
    }
  }
`

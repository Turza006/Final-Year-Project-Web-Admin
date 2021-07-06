// eslint-disable-next-line no-unused-vars
import { TOAST } from '~/utils/strings'
// eslint-disable-next-line no-unused-vars
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
// eslint-disable-next-line no-unused-vars
import { CREATE_FOOD_ITEM, EDIT_FOOD_ITEM, SHOW_SINGLE_RESTAURANT_FOOD_ITEMS, SINGLE_FOOD_ITEM } from '~/graphql'
import { API } from '~/utils/apiStatusCode'
import { CREATE_SPECIAL_MENU } from '~/graphql/mutations/specialMenu'
import { SHOW_ALL_SPECIAL_MENU } from '~/graphql/queries/special-menu'

export const state = () => ({
  singleRestaurantSpecialMenuItem: {
    FoodItems: [],
    count: 0
  },
  singleSpecialMenuItem: {}
})

export const mutations = {
  SET_SINGLE_RESTAURANT_SPECIAL_MENU: (state, payload) => {
    state.singleRestaurantSpecialMenuItem = payload
  },
  SET_SINGLE_SPECIAL_MENU: (state, payload) => {
    state.singleSpecialMenuItem = payload
  },
  DELETE_SPECIAL_MENU: (state, foodItemId) => {
    const index = state.singleRestaurantSpecialMenuItem.FoodItems.findIndex(food => food.id === foodItemId)
    if (index !== -1) {
      state.singleRestaurantSpecialMenuItem.FoodItems.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreateSpecialMenu: async ({
    dispatch,
    commit
  }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_SPECIAL_MENU, { payload }, { jwt })
    if (data.CreateSpecialMenu.code === API.SUCCESS) {
      // await dispatch('requestGetSingleRestaurantFoodItemByStatus', {
      //   $apollo,
      //   status: 'ACTIVE',
      //   jwt
      // })
      return {
        msg: data.CreateSpecialMenu.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.CreateSpecialMenu.msg,
        code: 'error'
      }
    }
  },
  // requestEditFoodItem: async ({
  //   // dispatch,
  //   commit
  // }, {
  //   $apollo,
  //   payload,
  //   foodItemId,
  //   jwt
  // }) => {
  //   const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_FOOD_ITEM, { payload, foodItemId }, { jwt })
  //   if (data.EditFoodItem.code === API.UPDATED) {
  //     // await dispatch('requestGetSingleRestaurantFoodItemByStatus', {
  //     //   $apollo,
  //     //   status: 'ACTIVE',
  //     //   jwt
  //     // })
  //     return {
  //       msg: data.EditFoodItem.msg,
  //       code: 'success'
  //     }
  //   } else {
  //     return {
  //       msg: data.EditFoodItem.msg,
  //       code: 'error'
  //     }
  //   }
  // },
  requestGetSpecialMenu: async ({ commit }, {
    $apollo,
    restaurantId,
    status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_ALL_SPECIAL_MENU, {
      restaurantId,
      status,
      limit,
      offset
    }, { jwt })
    if (data.ShowAllSpecialMenu !== null && data.ShowAllSpecialMenu.code === API.SUCCESS) {
      await commit('SET_SINGLE_RESTAURANT_SPECIAL_MENU', data.ShowAllSpecialMenu)
      return {
        code: 'success',
        msg: data.ShowAllSpecialMenu.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  }
  // requestGetSingleFoodItem: async ({ commit }, {
  //   $apollo,
  //   FoodItemId,
  //   jwt
  // }) => {
  //   const { data } = await getDataWithCustomHeader($apollo, SINGLE_FOOD_ITEM, {
  //     FoodItemId
  //   }, { jwt })
  //   if (data.SingleFoodItem !== null && data.SingleFoodItem.code === API.SUCCESS) {
  //     await commit('SET_SINGLE_FOOD_ITEM', data.SingleFoodItem)
  //     return {
  //       code: 'success',
  //       msg: data.SingleFoodItem.msg
  //     }
  //   } else {
  //     return {
  //       code: 'error',
  //       msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
  //     }
  //   }
  // },
  // requestDeleteFoodItem: async ({ commit }, {
  //   $apollo,
  //   foodItemId,
  //   jwt
  // }) => {
  //   const payload = {
  //     status: API.DELETED
  //   }
  //   const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_FOOD_ITEM, {
  //     payload,
  //     foodItemId
  //   }, { jwt })
  //
  //   if (data.EditFoodItem !== null && data.EditFoodItem.code === API.UPDATED) {
  //     await commit('DELETE_FOOD_ITEM', foodItemId)
  //     return {
  //       msg: TOAST.MENU_FOOD_ITEM_DELETED,
  //       code: 'success'
  //     }
  //   } else {
  //     return {
  //       msg: data.EditFoodItem.msg,
  //       code: 'error'
  //     }
  //   }
  // }
}

export const getters = {
  singleRestaurantSpecialMenuItem: ({ singleRestaurantSpecialMenuItem }) => singleRestaurantSpecialMenuItem,
  singleSpecialMenu: ({ singleSpecialMenu }) => singleSpecialMenu
}

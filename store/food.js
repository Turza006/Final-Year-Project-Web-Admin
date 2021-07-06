import { TOAST } from '~/utils/strings'
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { CREATE_FOOD_ITEM, EDIT_FOOD_ITEM, SHOW_SINGLE_RESTAURANT_FOOD_ITEMS, SINGLE_FOOD_ITEM } from '~/graphql'
import { API } from '~/utils/apiStatusCode'

export const state = () => ({
  singleRestaurantFoodItems: {
    FoodItems: [],
    count: 0
  },
  singleFoodItem: {}
})

export const mutations = {
  SET_SINGLE_RESTAURANT_FOOD_ITEM: (state, payload) => {
    state.singleRestaurantFoodItems = payload
  },
  SET_SINGLE_FOOD_ITEM: (state, payload) => {
    state.singleFoodItem = payload
  },
  DELETE_FOOD_ITEM: (state, foodItemId) => {
    const index = state.singleRestaurantFoodItems.FoodItems.findIndex(food => food.id === foodItemId)
    if (index !== -1) {
      state.singleRestaurantFoodItems.FoodItems.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreateFoodItem: async ({
    dispatch,
    commit
  }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_FOOD_ITEM, { payload }, { jwt })
    if (data.CreateFoodItem.code === API.SUCCESS) {
      await dispatch('requestGetSingleRestaurantFoodItemByStatus', {
        $apollo,
        status: 'ACTIVE',
        jwt
      })
      return {
        msg: data.CreateFoodItem.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.CreateFoodItem.msg,
        code: 'error'
      }
    }
  },
  requestEditFoodItem: async ({
    // dispatch,
    commit
  }, {
    $apollo,
    payload,
    foodItemId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_FOOD_ITEM, { payload, foodItemId }, { jwt })
    if (data.EditFoodItem.code === API.UPDATED) {
      // await dispatch('requestGetSingleRestaurantFoodItemByStatus', {
      //   $apollo,
      //   status: 'ACTIVE',
      //   jwt
      // })
      return {
        msg: data.EditFoodItem.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditFoodItem.msg,
        code: 'error'
      }
    }
  },
  requestGetSingleRestaurantFoodItemByStatus: async ({ commit }, {
    $apollo,
    RestaurantID,
    status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_SINGLE_RESTAURANT_FOOD_ITEMS, {
      RestaurantID,
      status,
      limit,
      offset
    }, { jwt })
    if (data.SingleRestaurantFoodItems !== null && data.SingleRestaurantFoodItems.code === API.SUCCESS) {
      await commit('SET_SINGLE_RESTAURANT_FOOD_ITEM', data.SingleRestaurantFoodItems)
      return {
        code: 'success',
        msg: data.SingleRestaurantFoodItems.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestGetSingleFoodItem: async ({ commit }, {
    $apollo,
    FoodItemId,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SINGLE_FOOD_ITEM, {
      FoodItemId
    }, { jwt })
    if (data.SingleFoodItem !== null && data.SingleFoodItem.code === API.SUCCESS) {
      await commit('SET_SINGLE_FOOD_ITEM', data.SingleFoodItem)
      return {
        code: 'success',
        msg: data.SingleFoodItem.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteFoodItem: async ({ commit }, {
    $apollo,
    foodItemId,
    jwt
  }) => {
    const payload = {
      status: API.DELETED
    }
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_FOOD_ITEM, {
      payload,
      foodItemId
    }, { jwt })

    if (data.EditFoodItem !== null && data.EditFoodItem.code === API.UPDATED) {
      await commit('DELETE_FOOD_ITEM', foodItemId)
      return {
        msg: TOAST.MENU_FOOD_ITEM_DELETED,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditFoodItem.msg,
        code: 'error'
      }
    }
  }
}

export const getters = {
  singleRestaurantFoodItems: ({ singleRestaurantFoodItems }) => singleRestaurantFoodItems,
  singleFoodItem: ({ singleFoodItem }) => singleFoodItem
}

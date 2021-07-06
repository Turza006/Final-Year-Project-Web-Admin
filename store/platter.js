import { TOAST } from '~/utils/strings'
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import {
  CREATE_PLATTER_ITEM,
  EDIT_PLATTER_ITEM,
  SHOW_SINGLE_RESTAURANT_PLATTER_ITEMS,
  SINGLE_PLATTER_ITEM
} from '~/graphql'
import { API } from '~/utils/apiStatusCode'

export const state = () => ({
  singleRestaurantPlatterItems: {
    PlatterItems: [],
    count: 0
  },
  singlePlatterItem: {}
})

export const mutations = {
  SET_SINGLE_PLATTER_ITEM: (state, payload) => {
    state.singlePlatterItem = payload
  },
  SET_SINGLE_RESTAURANT_PLATTER_ITEM: (state, payload) => {
    state.singleRestaurantPlatterItems = payload
  },
  DELETE_PLATTER_ITEM: (state, platterId) => {
    const index = state.allPlatterItems.PlatterItems.findIndex(food => food.id === platterId)
    if (index !== -1) {
      state.allPlatterItems.PlatterItems.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreatePlatterItem: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_PLATTER_ITEM, { payload }, { jwt })
    if (data.CreatePlatterItem.code === API.SUCCESS) {
      // await dispatch('requestGetAllPlatterItemByStatus', { $apollo, status: 'ACTIVE', jwt })
      return {
        msg: data.CreatePlatterItem.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.CreatePlatterItem.msg,
        code: 'error'
      }
    }
  },
  requestEditPlatterItem: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_PLATTER_ITEM, { ...payload }, { jwt })
    if (data.EditPlatterItem.code === API.UPDATED) {
      // await dispatch('requestGetAllPlatterItemByStatus', { $apollo, status: 'ACTIVE', jwt })
      return {
        msg: data.EditPlatterItem.msg,
        code: API.SUCCESS
      }
    } else {
      return {
        msg: data.EditPlatterItem.msg,
        code: API.ERROR
      }
    }
  },
  requestGetSingleRestaurantPlatterItems: async ({ commit }, {
    $apollo,
    RestaurantID,
    status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_SINGLE_RESTAURANT_PLATTER_ITEMS, {
      RestaurantID,
      status,
      limit,
      offset
    }, { jwt })
    if (data.SingleRestaurantPlatterItems !== null && data.SingleRestaurantPlatterItems.code === API.SUCCESS) {
      await commit('SET_SINGLE_RESTAURANT_PLATTER_ITEM', data.SingleRestaurantPlatterItems)
      return {
        code: 'success',
        msg: data.SingleRestaurantPlatterItems.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeletePlatterItem: async ({ commit }, {
    $apollo,
    platterItemId,
    jwt
  }) => {
    const payload = {
      status: API.DELETED
    }
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_PLATTER_ITEM, {
      payload,
      platterItemId
    }, { jwt })

    if (data.EditPlatterItem !== null && data.EditPlatterItem.code === API.UPDATED) {
      await commit('DELETE_PLATTER_ITEM', platterItemId)
      return {
        msg: TOAST.MENU_PLATTER_ITEM_DELETED,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditPlatterItem.msg,
        code: 'error'
      }
    }
  },
  requestGetSinglePlatterItem: async ({ commit }, {
    $apollo,
    PlatterItemId,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SINGLE_PLATTER_ITEM, {
      PlatterItemId
    }, { jwt })
    if (data.SinglePlatterItem !== null && data.SinglePlatterItem.code === API.SUCCESS) {
      await commit('SET_SINGLE_PLATTER_ITEM', data.SinglePlatterItem)
      return {
        code: 'success',
        msg: data.SinglePlatterItem.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  }
}

export const getters = {
  allPlatterItems: ({ allPlatterItems }) => allPlatterItems,
  singleRestaurantPlatterItems: ({ singleRestaurantPlatterItems }) => singleRestaurantPlatterItems,
  singlePlatterItem: ({ singlePlatterItem }) => singlePlatterItem
}

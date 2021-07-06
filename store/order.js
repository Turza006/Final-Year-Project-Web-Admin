import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { EDIT_ORDER, SHOW_ALL_ORDER_BY_RESTAURANT_ID, SHOW_SINGLE_ORDER_DETAILS } from '~/graphql'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'

export const state = () => ({
  allOrder: {
    Orders: [],
    count: 0
  },
  singleOrder: {}
})

export const mutations = {
  SET_ALL_ORDER: (state, payload) => {
    state.allOrder = payload
  },
  UPDATE_ORDER: (state, { orderId, payload }) => {
    const index = state.allOrder.Orders.findIndex(order => order.id === orderId)
    if (index !== -1) {
      state.allOrder.Orders[index] = { ...state.allOrder.Orders[index], ...payload }
    } else {
      console.log('order not found')
    }
  },
  SET_SINGLE_ORDER: (state, payload) => {
    state.singleOrder = payload
  }
}

export const actions = {
  requestShowAllOrder: async ({ commit }, {
    $apollo,
    RestaurantID,
    Status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_ALL_ORDER_BY_RESTAURANT_ID, {
      RestaurantID,
      Status,
      limit,
      offset
    }, { jwt })

    if (data.ShowAllOrderByRestaurantID !== null && data.ShowAllOrderByRestaurantID.code === API.SUCCESS) {
      await commit('SET_ALL_ORDER', data.ShowAllOrderByRestaurantID)
      return {
        code: 'success',
        msg: data.ShowAllOrderByRestaurantID.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestShowSingleOrderDetails: async ({ commit }, {
    $apollo,
    OrderId,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, SHOW_SINGLE_ORDER_DETAILS, {
      OrderId
    }, { jwt })

    if (data.ShowSingleOrderDetails !== null && data.ShowSingleOrderDetails.code === API.SUCCESS) {
      await commit('SET_SINGLE_ORDER', data.ShowSingleOrderDetails)
      return {
        code: 'success',
        msg: data.ShowSingleOrderDetails.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestEditOrder: async ({ commit }, {
    $apollo,
    payload,
    orderId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_ORDER, {
      payload,
      orderId
    }, { jwt })

    if (data.EditOrder !== null && data.EditOrder.code === API.EDITED) {
      // await commit('UPDATE_ORDER', {
      //   orderId,
      //   payload
      // })
      return {
        msg: TOAST.SUCCESS,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditOrder.msg,
        code: 'error'
      }
    }
  }
}

export const getters = {
  allOrder: ({ allOrder }) => allOrder,
  singleOrder: ({ singleOrder }) => singleOrder
}

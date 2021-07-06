import { getDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'
import { GET_ALL_ORDER_WITH } from '~/graphql'

export const state = () => ({
  allOrderWith: {
    OrderWiths: [],
    count: 0
  }
})

export const mutations = {
  SET_ALL_ORDER_WITH: (state, payload) => {
    state.allOrderWith = payload
  }
}

export const actions = {
  requestGetAllOrderWith: async ({ commit }, {
    $apollo,
    status,
    limit,
    offset,
    jwt
  }) => {
    const data = await getDataWithCustomHeader($apollo, GET_ALL_ORDER_WITH, {
      status,
      limit,
      offset
    }, { jwt })

    if (data.GetALlOrderWithByStatus !== null && data.GetALlOrderWithByStatus.code === API.SUCCESS) {
      await commit('SET_ALL_ORDER_WITH', data.GetALlOrderWithByStatus)
      return {
        code: 'success',
        msg: data.GetALlOrderWithByStatus.msg
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
  allOrderWith: ({ allOrderWith }) => allOrderWith
}

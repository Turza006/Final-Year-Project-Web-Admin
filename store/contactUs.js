import { getDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'
import { GET_ALL_CONTACT_US_BY_RESTAURANT_ID } from '~/graphql/queries/contactUs'

export const state = () => ({
  allContactUs: {
    ContuctUsS: [],
    count: 0
  }
})

export const mutations = {
  SET_ALL_CONTACT_US: (state, payload) => {
    state.allContactUs = payload
  }
}

export const actions = {
  requestGetAllContactUs: async ({ commit }, {
    $apollo,
    RestaurantId,
    limit,
    offset,
    status,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, GET_ALL_CONTACT_US_BY_RESTAURANT_ID, {
      RestaurantId,
      limit,
      offset,
      status
    }, { jwt })
    if (data.GetContactUsByRestaurantId !== null && data.GetContactUsByRestaurantId.code === API.SUCCESS) {
      await commit('SET_ALL_CONTACT_US', data.GetContactUsByRestaurantId)
      return {
        code: API.SUCCESS,
        msg: data.GetContactUsByRestaurantId.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  }
}

export const getters = {
  allContactUs: ({ allContactUs }) => allContactUs
}

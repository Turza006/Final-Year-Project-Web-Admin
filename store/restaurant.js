import { TOAST } from '~/utils/strings'
import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { EDIT_RESTAURANT, SHOW_SINGLE_RESTAURANT, SHOW_SINGLE_RESTAURANT_FOR_SETTINGS } from '~/graphql'
import { API } from '~/utils/apiStatusCode'

export const state = () => ({
  singleRestaurant: {},
  totalFloor: []
})

export const mutations = {
  SET_SINGLE_RESTAURANT: (state, payload) => {
    state.singleRestaurant = payload
  },
  ADD_TABLE: (state, payload) => {
    state.singleRestaurant.totalFloorData.push(payload)
  },
  SET_TOTAL_FLOOR: (state, payload) => {
    state.singleRestaurant.totalFloorData.push(payload)
  }
}

export const actions = {
  setTotalFloor: async ({ commit }, payload) => {
    await commit('SET_TOTAL_FLOOR', payload)
  },
  requestGetSingleRestaurant: async ({ commit }, {
    $apollo,
    uniqueName,
    jwt,
    isForSettings
  }) => {
    let data
    if (isForSettings) {
      const res = await getDataWithCustomHeader($apollo, SHOW_SINGLE_RESTAURANT_FOR_SETTINGS, {
        uniqueName
      }, { jwt })
      data = res.data
    } else {
      const res = await getDataWithCustomHeader($apollo, SHOW_SINGLE_RESTAURANT, {
        uniqueName
      }, { jwt })
      data = res.data
    }
    if (data.ShowSingleRestaurant !== null && data.ShowSingleRestaurant.code === API.SUCCESS) {
      await commit('SET_SINGLE_RESTAURANT', data.ShowSingleRestaurant)
      return {
        code: 'success',
        msg: data.ShowSingleRestaurant.msg
      }
    } else {
      return {
        code: 'error',
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestEditRestaurant: async ({ commit }, {
    $apollo,
    payload,
    restaurantId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_RESTAURANT, {
      payload,
      restaurantId
    }, { jwt })
    if (data.EditRestaurant !== null && data.EditRestaurant.code === API.UPDATED) {
      return {
        msg: data.EditRestaurant.msg,
        code: 'success'
      }
    } else {
      return {
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER,
        code: 'error'
      }
    }
  }
}

export const getters = {
  singleRestaurant: ({ singleRestaurant }) => singleRestaurant,
  restaurantUniqueName: ({ singleRestaurant }) => singleRestaurant.uniqueName,
  restaurantId: ({ singleRestaurant }) => singleRestaurant._id,
  singleRestaurantSlider: ({ singleRestaurant }) => singleRestaurant.slider,
  singleRestaurantSocialLinks: ({ singleRestaurant }) => singleRestaurant.socialLink,
  singleRestaurantFloors: ({ singleRestaurant }) => singleRestaurant.totalFloorData,
  singleRestaurantThirdPartyServices: ({ singleRestaurant }) => singleRestaurant.ordersWith !== null ? singleRestaurant.ordersWith : []
}

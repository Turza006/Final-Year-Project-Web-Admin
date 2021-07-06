import { TOAST } from '~/utils/strings'
import { getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { CREATE_STAFF, EDIT_STAFF } from '~/graphql'
import { API } from '~/utils/apiStatusCode'

export const state = () => ({
  allStaff: {
    Staffs: [],
    count: 0
  },
  singleStaff: {}
})

export const mutations = {
  SET_ALL_STAFF: (state, payload) => {
    state.allStaff = payload
  },
  SET_SINGLE_STAFF: (state, payload) => {
    state.singleFoodItem = payload
  },
  DELETE_STAFF: (state, foodId) => {
    const index = state.allStaff.Staffs.findIndex(food => food.id === foodId)
    if (index !== -1) {
      state.allStaff.Staffs.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreateStaff: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const data = await getMutationDataWithCustomHeader($apollo, CREATE_STAFF, { payload }, { jwt })
    if (data.CreateStaff !== null && data.CreateStaff.code === API.CREATED) {
      return {
        msg: data.CreateStaff.msg,
        code: 'success'
      }
    } else {
      return {
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER,
        code: 'error'
      }
    }
  },
  requestEditStaff: async ({ commit }, {
    $apollo,
    payload,
    staffId,
    jwt
  }) => {
    const data = await getMutationDataWithCustomHeader($apollo, EDIT_STAFF, {
      payload,
      staffId
    }, { jwt })
    if (data.EditStaff !== null && data.EditStaff.code === API.UPDATED) {
      return {
        msg: data.EditStaff.msg,
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
  allStaff: ({ allStaff }) => allStaff,
  singleFoodItem: ({ singleFoodItem }) => singleFoodItem
}

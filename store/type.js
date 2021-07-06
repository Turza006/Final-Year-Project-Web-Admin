import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { GET_ALL_TYPE } from '~/graphql/queries/type'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'
import { CREATE_TYPE, DELETE_TYPE, EDIT_TYPE } from '~/graphql/mutations/type'
import { CREATE_SUB_TYPE, DELETE_SUB_TYPE, EDIT_SUB_TYPE } from '~/graphql/mutations/subType'

export const state = () => ({
  allType: {
    MenuTypes: [],
    count: 0
  },
  allSubType: {
    MenuSubTypes: [],
    count: 0
  }
})

export const mutations = {
  SET_ALL_TYPE: (state, payload) => {
    state.allType = payload
  },
  SET_ALL_SUB_TYPE: (state, payload) => {
    state.allSubType = payload
  },
  DELETE_TYPE: (state, payload) => {
    const index = state.allType.MenuTypes.findIndex(menuType => menuType.id === payload.id)
    if (index !== -1) {
      state.allType.MenuTypes.splice(index, 1)
    }
  },
  DELETE_SUB_TYPE: (state, payload) => {
    const index = state.allSubType.MenuSubTypes.findIndex(menuSubType => menuSubType.id === payload.id)
    if (index !== -1) {
      state.allType.MenuTypes.splice(index, 1)
    }
  },
  UPDATE_TYPE: (state, payload) => {
    const index = state.allType.MenuTypes.findIndex(menuType => menuType.id === payload.id)
    if (index !== -1) {
      state.allType.MenuTypes[index].typeName = payload.typeName
      state.allType.MenuTypes[index].status = payload.status
      state.allType.MenuTypes[index].restaurant = payload.restaurant
    }
  },
  ADD_NEW_TYPE: (state, payload) => {
    state.allType.MenuTypes.push(payload)
  },
  ADD_NEW_SUBTYPE: (state, payload) => {
    state.allType.MenuTypes.subTypes.push(payload)
  }
}

export const actions = {
  requestGetAllTypes: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, GET_ALL_TYPE, { ...payload }, { jwt })
    console.log(data.GetAllType)
    if (data.GetAllType !== null && data.GetAllType.code === API.SUCCESS) {
      await commit('SET_ALL_TYPE', data.GetAllType)
      return {
        code: API.SUCCESS,
        msg: data.GetAllType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, DELETE_TYPE, { ...payload }, jwt)
    if (data.DeleteType !== null && data.DeleteType.code === API.SUCCESS) {
      await commit('DELETE_TYPE', {
        id: payload.typeId
      })
      return {
        code: API.SUCCESS,
        msg: data.DeleteType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestCreateType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_TYPE, { payload: { ...payload } }, jwt)
    if (data.CreateNewType !== null && data.CreateNewType.code === API.SUCCESS) {
      return {
        code: API.SUCCESS,
        msg: data.CreateNewType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },

  requestEditType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_TYPE, { ...payload }, jwt)
    if (data.UpdateType !== null && data.UpdateType.code === API.SUCCESS) {
      // await commit('ADD_NEW_TYPE', data.UpdateType.MenuTypes)
      return {
        code: API.SUCCESS,
        msg: data.UpdateType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },

  requestCreateSubType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_SUB_TYPE, { payload: { ...payload } }, jwt)
    if (data.CreateNewSubType !== null && data.CreateNewSubType.code === API.SUCCESS) {
      return {
        code: API.SUCCESS,
        msg: data.CreateNewSubType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },

  requestEditSubType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_SUB_TYPE, { ...payload }, jwt)
    if (data.UpdateSubType !== null && data.UpdateSubType.code === API.SUCCESS) {
      // await commit('ADD_NEW_TYPE', data.UpdateType.MenuTypes)
      return {
        code: API.SUCCESS,
        msg: data.UpdateSubType.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteSubType: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    console.log(payload)
    const { data } = await getMutationDataWithCustomHeader($apollo, DELETE_SUB_TYPE, { ...payload }, jwt)
    if (data.DeleteSubType !== null && data.DeleteSubType.code === API.SUCCESS) {
      return {
        code: API.SUCCESS,
        msg: data.DeleteSubType.msg
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
  allType: ({ allType }) => allType
}

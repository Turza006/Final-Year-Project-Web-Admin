import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { GET_ALL_SUPPLIER, GET_SINGLE_SUPPLIER } from '~/graphql/queries/supplier'
import { API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'
import { CREATE_SUPPLIER, UPDATE_SUPPLIER } from '~/graphql/mutations/supplier'

export const state = () => ({
  allSupplier: {
    suppliers: [],
    count: 0
  },
  singleSupplier: {}
})

export const mutations = {
  SET_ALL_SUPPLIER: (state, payload) => {
    console.log(payload)
    state.allSupplier = payload
  },
  SET_SINGLE_SUPPLIER: (state, payload) => {
    console.log('Mutation================>', payload)
    state.singleSupplier = payload
    console.log('Mutation================>', state.singleSupplier)
  },
  DELETE_SINGLE_SUPPLIER: (state, supplierId) => {
    const index = state.allSupplier.suppliers.findIndex(supplier => supplier.id === supplierId)
    if (index !== -1) {
      state.allSupplier.suppliers.splice(index, 1)
    }
  }
}

export const actions = {
  requestAddSupplier: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_SUPPLIER, { payload }, { jwt })
    if (data.createSupplier !== null && data.createSupplier.code === API.SUCCESS) {
      return {
        code: API.SUCCESS,
        msg: data.GetAllSuppliers.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestGetAllSupplier: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, GET_ALL_SUPPLIER, { ...payload }, { jwt })
    if (data.GetAllSupplier !== null && data.GetAllSupplier.code === API.SUCCESS) {
      await commit('SET_ALL_SUPPLIER', data.GetAllSupplier)
      return {
        code: API.SUCCESS,
        msg: data.GetAllSupplier.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestGetSingleSupplier: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    console.log('Action==========>', payload)
    const { data } = await getDataWithCustomHeader($apollo, GET_SINGLE_SUPPLIER, { ...payload }, { jwt })
    console.log(data.GetSingleSupplier.code)
    if (data.GetSingleSupplier !== null && data.GetSingleSupplier.code === API.SUCCESS) {
      await commit('SET_SINGLE_SUPPLIER', data.GetSingleSupplier)
      return {
        code: API.SUCCESS,
        msg: data.GetSingleSupplier.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },

  requestUpdateSingleSupplier: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    console.log('Action==========>', payload)
    const { data } = await getMutationDataWithCustomHeader($apollo, UPDATE_SUPPLIER, { ...payload }, { jwt })
    if (data.updateSupplier !== null && data.updateSupplier.code === API.SUCCESS) {
      return {
        code: API.SUCCESS,
        msg: data.updateSupplier.msg
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
  allSupplier: ({ allSupplier }) => {
    console.log('Getter======>', allSupplier)
    return allSupplier
  },
  singleSupplier: ({ singleSupplier }) => {
    return singleSupplier
  }
}

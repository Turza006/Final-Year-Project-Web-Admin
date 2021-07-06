import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { API } from '~/utils/apiStatusCode'
import { CREATE_TABLE, EDIT_TABLE, GET_ALL_TABLE_BY_RESTAURANT_ID_AND_STATUS } from '~/graphql/mutations/table'
import { TOAST } from '~/utils/strings'
import { TABLE_TYPE_BY_RESTAURANT_ID } from '~/graphql'

export const state = () => ({
  allTable: [],
  singleTable: {},
  tableTypes: []
})

export const mutations = {
  SET_ALL_TABLE: (state, payload) => {
    state.allTable = payload
  },
  SET_ALL_TABLE_TYPES: (state, tableTypes) => {
    state.tableTypes = tableTypes
  },
  SET_SINGLE_TABLE: (state, payload) => {
    state.singleTable = payload
  },
  DELETE_TABLE: (state, tableId) => {
    const index = state.allTable.findIndex(table => table.id === tableId)
    if (index !== -1) {
      state.allTable.splice(index, 1)
    }
  }
}

export const actions = {
  requestCreateTable: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_TABLE, { payload }, { jwt })
    if (data.CreateTable.code === API.SUCCESS) {
      return {
        msg: data.CreateTable.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.CreateTable.msg,
        code: 'error'
      }
    }
  },
  requestEditTable: async ({ commit }, {
    $apollo,
    payload,
    tableId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_TABLE, { payload, tableId }, { jwt })
    if (data.EditTable.code === API.SUCCESS) {
      return {
        msg: data.EditTable.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditTable.msg,
        code: 'error'
      }
    }
  },
  requestGetAllTable: async ({ commit }, {
    $apollo,
    RestaurantId,
    status,
    floorName,
    jwt
  }) => {
    console.log('requestGetAllTable RestaurantId --> ', RestaurantId)
    const { data } = await getDataWithCustomHeader($apollo, GET_ALL_TABLE_BY_RESTAURANT_ID_AND_STATUS, { RestaurantId, status, floorName }, { jwt })
    if (data.GetAllTableByRestaurentIAndStatus !== null && data.GetAllTableByRestaurentIAndStatus.code === API.SUCCESS) {
      await commit('SET_ALL_TABLE', data.GetAllTableByRestaurentIAndStatus.Tables)
      return {
        code: API.SUCCESS,
        msg: data.GetAllTableByRestaurentIAndStatus.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestGetTableTypeByRestaurantId: async ({ commit }, {
    $apollo,
    RestaurantId,
    status,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, TABLE_TYPE_BY_RESTAURANT_ID, { RestaurantId, status }, { jwt })
    if (data.TableTypeByResturentId !== null && data.TableTypeByResturentId.code === API.SUCCESS) {
      await commit('SET_ALL_TABLE_TYPES', data.TableTypeByResturentId.TableType)
      return {
        code: API.SUCCESS,
        msg: data.TableTypeByResturentId.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestDeleteTable: async ({ commit }, {
    $apollo,
    tableId,
    Restaurant,
    jwt
  }) => {
    const payload = {
      status: API.DELETED,
      Restaurant
    }
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_TABLE, { payload, tableId }, { jwt })
    if (data.EditTable.code === API.SUCCESS) {
      await commit('DELETE_TABLE', tableId)
      return {
        msg: TOAST.TABLE_DELETED,
        code: 'success'
      }
    } else {
      return {
        msg: data.EditTable.msg,
        code: 'error'
      }
    }
  }
}

export const getters = {
  allTable: ({ allTable }) => allTable,
  singleTable: ({ singleTable }) => singleTable,
  tableTypes: ({ tableTypes }) => tableTypes
}

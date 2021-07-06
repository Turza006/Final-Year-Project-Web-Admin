import { getDataWithCustomHeader, getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import {
  ALL_RESERVATION_BY_STATUS,
  CREATE_RESERVATION,
  EDIT_RESERVATION,
  GET_SINGLE_RESERVATION_BY_ID
} from '~/graphql'
import { API as api, API } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'

export const state = () => ({
  allReservation: {
    Reservations: [],
    count: 0
  },
  singleReservation: {}
})

export const mutations = {
  SET_ALL_RESERVATION: (state, payload) => {
    state.allReservation = payload
  },
  SET_SINGLE_RESERVATION: (state, payload) => {
    delete payload.__typename
    delete payload.code
    delete payload.msg
    if (payload.reservationTableType !== null) {
      delete payload.reservationTableType.__typename
    }
    state.singleReservation = payload
  }
}

export const actions = {
  requestGetAllReservation: async ({ commit }, {
    $apollo,
    RestaurantId,
    Status,
    limit,
    offset,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, ALL_RESERVATION_BY_STATUS, {
      RestaurantId,
      Status,
      limit,
      offset
    }, { jwt })
    if (data.AllReservationByStatus !== null && data.AllReservationByStatus.code === API.SUCCESS) {
      await commit('SET_ALL_RESERVATION', data.AllReservationByStatus)
      return {
        code: API.SUCCESS,
        msg: data.AllReservationByStatus.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestGetSingleReservationById: async ({ commit }, {
    $apollo,
    ReservationId,
    jwt
  }) => {
    const { data } = await getDataWithCustomHeader($apollo, GET_SINGLE_RESERVATION_BY_ID, {
      ReservationId
    }, { jwt })
    if (data.SingleReservationDetails !== null && data.SingleReservationDetails.code === API.SUCCESS) {
      await commit('SET_SINGLE_RESERVATION', data.SingleReservationDetails)
      return {
        code: API.SUCCESS,
        msg: data.SingleReservationDetails.msg
      }
    } else {
      return {
        code: API.ERROR,
        msg: TOAST.SOMETHING_WENT_WRONG_PLEASE_TRY_AGAIN_LATER
      }
    }
  },
  requestCreateReservation: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_RESERVATION, {
      payload
    }, { jwt })
    if (data.createReservation.code === API.CREATED) {
      return {
        msg: data.createReservation.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.createReservation.msg,
        code: 'error'
      }
    }
  },
  requestEditReservation: async ({ commit }, {
    $apollo,
    payload,
    ReservationId,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, EDIT_RESERVATION, {
      payload,
      ReservationId
    }, { jwt })
    if (data.EditReservation.code === API.EDITED) {
      return {
        msg: data.EditReservation.msg,
        code: api.SUCCESS
      }
    } else {
      return {
        msg: data.EditReservation.msg,
        code: api.ERROR
      }
    }
  }
}

export const getters = {
  allReservation: ({ allReservation }) => allReservation,
  singleReservation: ({ singleReservation }) => singleReservation
}

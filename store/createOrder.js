import { getMutationDataWithCustomHeader } from '~/utils/apolloApiUtil'
import { CREATE_ORDER } from '~/graphql'
import { API } from '~/utils/apiStatusCode'
const INITIAL_PAYLOAD = {
  restaurant: '',
  customerName: '',
  customerPhoneNo: '',
  customerEmail: '',
  customerAddress: '',
  orderedItem: [],
  adminSelectedTable: [],
  note: '',
  subTotal: 0,
  discount: 0,
  vat: 5,
  serviceFee: 5,
  otherFeeName: '',
  otherFeeAmount: 0,
  totalPrice: 0,
  promoCode: '',
  paymentMethod: ''
}
export const state = () => ({
  payload: INITIAL_PAYLOAD,
  orderType: null,
  orderTable: null
})

export const mutations = {
  RESET_CREATE_ORDER_DATA: (state) => {
    state.payload = INITIAL_PAYLOAD
  },
  UPDATE_CUSTOMER_INFO: (state, payload) => {
    const {
      customerName,
      customerPhoneNo,
      customerEmail,
      customerAddress
    } = payload
    state.payload = {
      ...state.payload,
      customerName,
      customerPhoneNo,
      customerEmail,
      customerAddress
    }
  },
  UPDATE_NOTE: (state, note) => {
    state.payload.note = note
  },
  UPDATE_PAYMENT_METHOD: (state, paymentMethod) => {
    state.payload.paymentMethod = paymentMethod
  },
  ADD_ORDER_ITEM: (state, item) => {
    const index = state.payload.orderedItem.findIndex(orderItem => orderItem.foodItem === item.id || orderItem.foodItem === item.foodItem)
    if (index === -1) {
      console.log(item)
      if (item.itemType === 'Platter') {
        state.payload.orderedItem.push({
          platterItem: item.id,
          name: item.name,
          image: item.image,
          qty: 1,
          price: item.price
        })
      } else {
        state.payload.orderedItem.push({
          foodItem: item.id,
          name: item.name,
          image: item.image,
          qty: 1,
          price: item.price
        })
      }
    } else {
      state.payload.orderedItem[index].qty++
    }
  },
  DECREMENT_ORDER_ITEM: (state, item) => {
    const index = state.payload.orderedItem.findIndex(orderItem => orderItem.foodItem === item.id || orderItem.foodItem === item.foodItem)
    if (index !== -1) {
      if (state.payload.orderedItem[index].qty === 1) {
        state.payload.orderedItem.splice(index, 1)
      } else {
        state.payload.orderedItem[index].qty--
      }
    }
  },
  VAT_UPDATED: (state, vat) => {
    state.payload.vat = vat
    state.payload.totalPrice += vat
  },
  UPDATE_DISCOUNT: (state, discount) => {
    state.payload.discount = discount
  },
  SERVICE_FEE_UPDATED: (state, serviceFee) => {
    state.payload.serviceFee = serviceFee
    state.payload.totalPrice += serviceFee
  },
  UPDATE_OTHER_FEE_NAME: (state, otherFeeName) => {
    state.payload.otherFeeName = otherFeeName
  },
  UPDATE_OTHER_FEE_AMOUNT: (state, otherFeeAmount) => {
    state.payload.otherFeeAmount = otherFeeAmount
  },
  UPDATE_SUB_TOTAL_AND_TOTAL_PRICE: (state) => {
    let subTotal = 0
    state.payload.orderedItem.forEach((item) => {
      subTotal += (item.qty * item.price)
    })
    state.payload.subTotal = subTotal
    state.payload.totalPrice = (state.payload.subTotal + state.payload.vat + state.payload.serviceFee + state.payload.otherFeeAmount) - state.payload.discount
  },
  SET_ORDER_TYPE: (state, orderType) => {
    state.orderType = orderType
  },
  UNSET_ORDER_TYPE: (state) => {
    state.orderType = null
  },
  SET_ORDER_TABLE: (state, table) => {
    state.orderTable = table
  },
  UNSET_ORDER_TABLE: (state) => {
    state.orderTable = null
  }
}

export const actions = {
  requestCreateOrder: async ({ commit }, {
    $apollo,
    payload,
    jwt
  }) => {
    const { data } = await getMutationDataWithCustomHeader($apollo, CREATE_ORDER, { payload }, { jwt })
    if (data.CreateOrder.code === API.SUCCESS) {
      await commit('RESET_CREATE_ORDER_DATA')
      return {
        msg: data.CreateOrder.msg,
        code: 'success'
      }
    } else {
      return {
        msg: data.CreateOrder.msg,
        code: 'error'
      }
    }
  },
  requestIncrementOrderItem: async ({ commit }, { item }) => {
    await commit('ADD_ORDER_ITEM', item)
    await commit('UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
  },
  requestDecrementOrderItem: async ({ state, commit }, { item }) => {
    await commit('DECREMENT_ORDER_ITEM', item)
    await commit('UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
  }
}

export const getters = {
  payload: ({ payload }) => payload,
  subTotal: ({ payload }) => payload.subTotal,
  discount: ({ payload }) => payload.discount,
  vat: ({ payload }) => payload.vat,
  serviceFee: ({ payload }) => payload.serviceFee,
  otherFeeName: ({ payload }) => payload.otherFeeName,
  otherFeeAmount: ({ payload }) => payload.otherFeeAmount,
  paymentMethod: ({ payload }) => payload.paymentMethod,
  totalPrice: ({ payload }) => payload.totalPrice,
  orderType: ({ orderType }) => orderType,
  orderTable: ({ orderTable }) => orderTable
}

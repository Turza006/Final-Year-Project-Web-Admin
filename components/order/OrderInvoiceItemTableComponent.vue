<template>
  <div>
    <v-simple-table class="white">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Item
            </th>
            <th class="text-left">
              Price
            </th>
            <th class="text-left">
              Qty
            </th>
            <th class="text-left">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in orderItems"
            :key="item.name"
          >
            <td>{{ item.foodItem ? item.foodItem.name : item.platterItem.name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ (item.price * item.qty).toFixed(2) }}</td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td colspan="3" align="right" class="td-style">
              Subtotal
            </td>
            <td class="td-style">
              {{ subTotal }}
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td colspan="3" align="right" class="td-style">
              Discount
            </td>
            <td class="td-style">
              {{ discount }}
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              Service Charge
            </td>
            <td class="td-style">
              {{ serviceFee }}
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              Vat
            </td>
            <td class="td-style">
              {{ vat }}
            </td>
          </tr>
          <tr v-if="otherFeeName" class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              {{ otherFeeName }}
            </td>
            <td class="td-style">
              {{ otherFeeAmount }}
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              Grand Total
            </td>
            <td class="td-style">
              {{ totalPrice }}
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              Paid Amount
            </td>
            <td class="td-style">
              0
            </td>
          </tr>
          <tr class="subtitle-2 font-weight-bold">
            <td class="td-style" colspan="3" align="right">
              Change Due
            </td>
            <td class="td-style">
              0
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'OrderInvoiceItemTableComponent',
  props: {
    orderItems: {
      type: Array,
      required: true
    },
    discount: {
      type: Number,
      required: true
    },
    vat: {
      type: Number,
      required: true
    },
    serviceFee: {
      type: Number,
      required: true
    },
    otherFeeName: {
      type: String,
      default: ''
    },
    otherFeeAmount: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    subTotal () {
      let subTotal = 0
      for (let i = 0; i < this.orderItems.length; i++) {
        subTotal += this.orderItems[i].price * this.orderItems[i].qty
        console.log(subTotal)
      }

      return subTotal
    }
  },
  created () {
    console.log(this.orderItems)
  }
}
</script>

<style scoped>
.td-style {
  height: 30px !important;
  border-bottom: none !important;
}
</style>

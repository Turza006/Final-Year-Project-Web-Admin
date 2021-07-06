<template>
  <div v-if="!loading" class="pa-5">
    <v-container fluid>
      <v-row>
        <v-col class="pa-0">
          <v-avatar rounded>
            <v-img max-width="80px" :src="imgBaseUrl + singleRestaurant.logo" />
          </v-avatar>
        </v-col>
        <v-col align="right" class="pa-0">
          <p class="title">
            Invoice
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 body-2">
          <div class="title">
            {{ singleRestaurant.name }}
          </div>
          <div>
            {{ _getAddressFromLocation(singleRestaurant.address) }}
          </div>
          <div>
            Phone: {{ _getStringFromArray(singleRestaurant.phoneNo) }}
          </div>
          <div>
            Email: {{ _getStringFromArray(singleRestaurant.email) }}
          </div>
        </v-col>
        <v-col align="right" class="pa-0 body-2">
          <div>
            Order No: {{ singleOrder.orderNo }}
          </div>
          <div>
            Order Status: {{ singleOrder.status }}
          </div>
          <div>
            Billing Date: {{ _milliToDateYYYYMMDD(singleOrder.createdAt) }}
          </div>
          <span class="caption">
            Customer Info
            <v-divider style="width: 80px;" />
          </span>
          <div>
            {{ singleOrder.customerName }}
          </div>
          <div>
            {{ singleOrder.customerPhoneNo }}
          </div>
          <div>
            {{ singleOrder.customerEmail }}
          </div>
          <div>
            {{ singleOrder.customerAddress }}
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="mt-5" />
    <v-container fluid>
      <v-row>
        <v-col v-if="singleOrder.orderedItem" class="pa-0">
          <OrderInvoiceItemTableComponent
            :order-items="singleOrder.orderedItem"
            :discount="singleOrder.discount"
            :vat="singleOrder.vat"
            :service-fee="singleOrder.serviceFee"
            :other-fee-name="singleOrder.otherFeeName"
            :other-fee-amount="singleOrder.otherFeeAmount"
            :total-price="singleOrder.totalPrice"
            :payment-method="singleOrder.paymentMethod"
          />
        </v-col>
        <v-col v-else align="center">
          <v-progress-circular color="primary" indeterminate />
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import AddressMixin from '~/mixins/AddressMixin'
import ArrayConverterMixin from '~/mixins/ArrayConverterMixin'
import OrderInvoiceItemTableComponent from '~/components/order/OrderInvoiceItemTableComponent'

export default {
  name: 'OrderInvoiceComponent',
  components: { OrderInvoiceItemTableComponent },
  mixins: [DateConverterMixin, AddressMixin, ArrayConverterMixin],
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    singleOrder: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL
    }
  },
  computed: {
    ...mapGetters('restaurant', ['singleRestaurant'])
  }
}
</script>

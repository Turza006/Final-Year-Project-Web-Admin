<template>
  <v-data-table
    :headers="headers"
    :items="allOrder.Orders"
    :search="search"
    :loading="loading"
    :options.sync="options"
    :server-items-length="allOrder.count"
    class="grey lighten-4"
  >
    <template #[`item.otherFeeName`]="{ item }">
      <div v-if="item.otherFeeName">
        {{ item.otherFeeName }} : {{ item.otherFeeAmount }}
      </div>
      <div v-else>
        --
      </div>
    </template>
    <template #[`item.updatedAt`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            {{ item.updatedAt | _timeAgoFromMillis }}
          </span>
        </template>
        <span>{{ item.updatedAt | _milliToDate }}</span>
      </v-tooltip>
    </template>
    <template #[`item.createdAt`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            {{ item.createdAt | _timeAgoFromMillis }}
          </span>
        </template>
        <span>{{ item.createdAt | _milliToDate }}</span>
      </v-tooltip>
    </template>
    <template #[`item.actions`]="{item}">
      <v-btn class="ma-1" x-small outlined color="secondary" :to="`/sales/order/view/${item.id}`">
        <v-icon x-small class="mr-1">
          mdi-eye
        </v-icon>
        Details
      </v-btn>
      <v-btn
        v-if="item.status === orderStatusList.PENDING"
        class="ma-1"
        x-small
        outlined
        color="success"
        @click="updateOrderStatus(item, orderStatusList.ACCEPTED)"
      >
        <v-icon x-small class="mr-1">
          mdi-check
        </v-icon>
        Accept Order
      </v-btn>
      <v-btn
        v-if="item.status !== orderStatusList.PAID"
        class="ma-1"
        x-small
        outlined
        color="error"
        @click="updateOrderStatus(item, orderStatusList.CANCELLED)"
      >
        <v-icon x-small class="mr-1">
          mdi-close
        </v-icon>
        Cancel Order
      </v-btn>
      <v-btn
        v-if="item.status !== orderStatusList.PAID"
        class="ma-1"
        x-small
        outlined
        color="primary"
        @click="updateOrderStatus (item, orderStatusList.PAID)"
      >
        <v-icon x-small class="mr-1">
          mdi-wallet-outline
        </v-icon>
        Make Payment
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import { API as api, ORDER_STATUS } from '~/utils/apiStatusCode'
import { API_CALL_EVENT } from '~/utils/events'

export default {
  name: 'OrderDatatableComponent',
  mixins: [DateConverterMixin],
  props: {
    selectedStatus: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: false,
      orderStatusList: ORDER_STATUS,
      search: '',
      headers: [
        {
          text: 'Order No',
          value: 'orderNo'
        },
        {
          text: 'Table No',
          value: 'adminSelectedTable.tableNo'
        },
        {
          text: 'Customer Name',
          value: 'customerName'
        },
        {
          text: 'Customer PhoneNo',
          value: 'customerPhoneNo'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'VAT',
          value: 'vat'
        },
        {
          text: 'Other Fee',
          value: 'otherFeeName'
        },
        {
          text: 'Total Price',
          value: 'totalPrice'
        },
        {
          text: 'Payment Method',
          value: 'paymentMethod'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Updated at ',
          value: 'updatedAt'
        },
        {
          text: 'Created at ',
          value: 'createdAt'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 5,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('order', ['allOrder'])
  },
  watch: {
    async selectedStatus (newValue) {
      await this.getAllOrderNetworkCall()
    },
    options: {
      deep: true,
      async handler () {
        await this.getAllOrderNetworkCall()
      }
    }
  },
  async created () {
    await this.getAllOrderNetworkCall()
    this.$nuxt.$on(API_CALL_EVENT.REQUEST_SHOW_ALL_ORDER_NETWORK_CALL_EVENT, async () => {
      await this.getAllOrderNetworkCall()
    })
  },
  methods: {
    ...mapActions('order', ['requestShowAllOrder', 'requestEditOrder']),
    async getAllOrderNetworkCall () {
      this.loading = true
      await this.requestShowAllOrder({
        $apollo: this.$apollo,
        RestaurantID: this.restaurantId,
        Status: this.selectedStatus !== 'ALL' ? this.selectedStatus : null,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    },
    async updateOrderStatus (item, status) {
      let msg = ''
      switch (status) {
        case ORDER_STATUS.ACCEPTED:
          msg = 'Are you sure, do you really want to accept the order?' +
            '<div class="body-2"><br>Order No: ' + item.orderNo +
            '<br>Customer Name: ' + item.customerName +
            '<br>Customer Phone: ' + item.customerName +
            '<br>Order Total Price: ' + item.totalPrice + '</div>'
          break
        case ORDER_STATUS.CANCELLED:
          msg = 'Are you sure, do you really want to <span class="error--text">cancel</span> the order?' +
            '<div class="body-2"><br>Order No: ' + item.orderNo +
            '<br>Customer Name: ' + item.customerName +
            '<br>Customer Phone: ' + item.customerName +
            '<br>Order Total Price: ' + item.totalPrice + '</div>'
          break
        case ORDER_STATUS.PAID:
          msg = 'Are you sure. do you really want to confirm payment of the order?' +
            '<div class="body-2"><br>Order No: ' + item.orderNo +
            '<br>Customer Name: ' + item.customerName +
            '<br>Customer Phone: ' + item.customerName +
            '<br>Order Total Price: ' + item.totalPrice + '</div>'
          break
      }

      const value = await this.$confirm(msg)

      if (value) {
        this.loading = true

        const res = await this.requestEditOrder({
          $apollo: this.$apollo,
          payload: {
            status
          },
          orderId: item.id,
          jwt: this.jwt
        })
        if (res.code.toUpperCase() === api.SUCCESS) {
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SHOW_ALL_ORDER_NETWORK_CALL_EVENT)
        }
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
      }
    }
  }
}
</script>

<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allOrder.Orders"
      :search="search"
      :loading="loading"
      :options.sync="options"
      :server-items-length="allOrder.count"
    >
      <template #[`item.orderedItem`]="{item}">
        <div v-for="(food, index) in item.orderedItem" :key="index">
          <p v-if="food.foodItem" class="grey lighten-2 my-2 pa-1" style="border-radius: 5px;">
            {{ food.foodItem.name }}
            <br>
            Qty: {{ food.qty }}
          </p>
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
        <v-btn
          class="ma-1"
          x-small
          outlined
          color="secondary"
          @click="$nuxt.$emit(TOGGLE_KITCHEN_ORDER_DETAILS, item.id)"
        >
          <v-icon x-small class="mr-1">
            mdi-eye
          </v-icon>
          Details
        </v-btn>
        <v-btn
          v-if="item.status === orderStatusList.ACCEPTED"
          class="ma-1"
          x-small
          outlined
          color="success"
          @click="updateOrderStatus(item, orderStatusList.IN_PROGRESS)"
        >
          <v-icon x-small class="mr-1">
            mdi-check
          </v-icon>
          Start Cooking
        </v-btn>
        <!--        <v-btn
          v-if="item.status === orderStatusList.ACCEPTED"
          class="ma-1"
          x-small
          outlined
          color="error"
          @click="updateOrderStatus(item, orderStatusList.CANCELLED)"
        >
          <v-icon x-small class="mr-1">
            mdi-cancel
          </v-icon>
          Cancel Order
        </v-btn>-->
        <v-btn
          v-if="item.status === orderStatusList.IN_PROGRESS"
          class="ma-1"
          x-small
          outlined
          color="primary"
          @click="updateOrderStatus (item, orderStatusList.READY)"
        >
          <v-icon x-small class="mr-1">
            mdi-timeline-check-outline
          </v-icon>
          Done
        </v-btn>
      </template>
    </v-data-table>
    <DialogKitchenOrderDetails />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import { API as api, ORDER_STATUS } from '~/utils/apiStatusCode'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import DialogKitchenOrderDetails from '~/components/dialogs/DialogKitchenOrderDetails'

export default {
  name: 'KitchenOrderDatatableComponent',
  components: { DialogKitchenOrderDetails },
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
      TOGGLE_KITCHEN_ORDER_DETAILS: DIALOG_EVENT.TOGGLE_KITCHEN_ORDER_DETAILS,
      search: '',
      headers: [
        {
          text: 'Order No',
          value: 'orderNo'
        },
        {
          text: 'Table No',
          value: 'adminSelectedTable[0].tableNo'
        },
        {
          text: 'Order Item',
          value: 'orderedItem'
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
        itemsPerPage: 10,
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
    options: {
      deep: true,
      handler () {
        this.getAllOrderByNetworkCall()
      }
    },
    selectedStatus () {
      this.getAllOrderByNetworkCall()
    }
  },
  created () {
    this.getAllOrderByNetworkCall()
    this.$nuxt.$on(API_CALL_EVENT.REQUEST_SHOW_ALL_ORDER_NETWORK_CALL_EVENT, async () => {
      await this.getAllOrderByNetworkCall()
    })
  },
  methods: {
    ...mapActions('order', ['requestShowAllOrder', 'requestEditOrder']),
    async getAllOrderByNetworkCall () {
      this.loading = true
      await this.requestShowAllOrder({
        $apollo: this.$apollo,
        RestaurantID: this.restaurantId,
        Status: this.selectedStatus,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    },
    getTableNo (item) {
      return item.adminSelectedTable !== null && item.adminSelectedTable[0] !== undefined
        ? item.adminSelectedTable[0].tableNo
        : ''
    },
    getFoodItem (orderItems) {
      let orderedFoodItem = ''
      orderItems.forEach((orderItem) => {
        if (orderItem.foodItem !== null) {
          orderedFoodItem += `<p class="grey lighten-4 my-4 pa-2" v-if="food.foodItem">
            <span class="black--text">
              ${orderItem.foodItem.name}
            </span>
              <span class="float-right black--text font-weight-medium">
                Qty: ${orderItem.qty}
              </span>
          </p>`
        }
      })
      return orderedFoodItem
    },
    async updateOrderStatus (item, status) {
      const tableNo = this.getTableNo(item)
      const orderedFoodItem = this.getFoodItem(item.orderedItem)
      let msg = ''

      switch (status) {
        case ORDER_STATUS.IN_PROGRESS:
          msg = '<span class="title black--text">Want to start cooking?</span>' +
          '<div class="body-2"><br>Order No: ' + item.orderNo +
          '<br>Table No: ' + tableNo +
            '<br><br>' + orderedFoodItem + '</div>'
          break

        case ORDER_STATUS.CANCELLED:
          msg = '<span class="title black--text">Are you sure, do you really want to cancel the order?</span>' +
          '<div class="body-2"><br>Order No: ' + item.orderNo +
          '<br>Table No: ' + tableNo + '<br><br>' + orderedFoodItem + '</div>'
          break
        case ORDER_STATUS.READY:
          msg = '<span class="title black--text">Sure. Done with the cooking?</span>' +
          '<div class="body-2"><br>Order No: ' + item.orderNo +
          '<br>Table No: ' + tableNo + '<br><br>' + orderedFoodItem + '</div>'
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

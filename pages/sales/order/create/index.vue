<template>
  <div>
    <v-card elevation="10" tile>
      <v-card-title>Create Order (In-progress)</v-card-title>
      <v-divider />
      <v-row>
        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 8 : 12">
          <OrderFoodMenuComponent />
        </v-col>
        <v-col>
          <v-container>
            <v-row>
              <v-col v-if="!!orderTable">
                <span class="caption">Table No:</span> <span class="subtitle-2">{{ orderTable.tableNo }}</span>
              </v-col>
              <v-col>
                <span class="caption">Order Type:</span> <span class="subtitle-2">{{ orderType }}</span>
              </v-col>
            </v-row>
            <OrderCustomerInfoComponent />
            <OrderItemComponent :order-items="payload.orderedItem" />
            <OrderPriceComponent />
            <v-card-actions class="mb-5">
              <v-btn
                small
                color="primary"
                class="px-10 mx-auto"
                rounded
                :disabled="payload.orderedItem.length === 0"
                @click="createOrder()"
              >
                Create Order
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderFoodMenuComponent from '~/components/order/OrderFoodMenuComponent'
import { CREATE_ORDER_EVENT } from '~/utils/events'
import OrderCustomerInfoComponent from '~/components/order/OrderCustomerInfoComponent'
import OrderPriceComponent from '~/components/order/OrderPriceComponent'
import OrderItemComponent from '~/components/order/OrderItemComponent'

export default {
  name: 'PageCreateOrder',
  components: {
    OrderItemComponent,
    OrderPriceComponent,
    OrderCustomerInfoComponent,
    OrderFoodMenuComponent
  },
  data () {
    return {
      loading: false,
      adminSelectedTable: []
    }
  },
  computed: {
    ...mapGetters('auth', ['restaurantId', 'jwt']),
    ...mapGetters('createOrder', ['payload', 'orderType', 'orderTable'])
  },
  async created () {
    if (this.orderType === null) {
      await this.$router.push('/sales/order/choose-order-type')
    }
    if (this.orderType === 'dining' && this.orderTable === null) {
      await this.$router.push('/sales/order/dining-tables')
    }
    if (this.orderTable) {
      this.adminSelectedTable.push(this.orderTable.id)
    }
    this.$nuxt.$on(CREATE_ORDER_EVENT.ON_ITEM_SELECTED, async (item) => {
      console.log('CREATE_ORDER_EVENT.ON_ITEM_SELECTED')
      await this.$store.commit('createOrder/ADD_ORDER_ITEM', item)
      await this.$store.commit('createOrder/UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
    })
  },
  methods: {
    ...mapActions('createOrder', ['requestCreateOrder']),
    async createOrder () {
      // if (this.payload.customerName === '' || this.payload.customerPhoneNo === '') {
      //   this.$nuxt.$emit(CREATE_ORDER_EVENT.CUSTOMER_INFO_REQUIRED)
      //   this.$notifier.showMessage({
      //     content: TOAST.PLEASE_FILL_OUT_THE_CUSTOMER_INFORMATION,
      //     color: 'error'
      //   })
      // } else {
      const form = { ...this.payload }
      this.form.floor = this.orderTable.floor
      form.restaurant = this.restaurantId
      form.adminSelectedTable = this.adminSelectedTable
      form.orderedItem.forEach((item) => {
        delete item.name
        delete item.image
      })
      delete form.customerType
      delete form.note
      delete form.subTotal
      this.loading = true
      const res = await this.requestCreateOrder({
        $apollo: this.$apollo,
        payload: form,
        jwt: this.jwt
      })
      this.loading = false
      this.$notifier.showMessage({
        content: res.msg,
        color: res.code
      })
      await this.$router.push('/sales/order/manage-order')
    }
  }
  // }
}
</script>

<style scoped>

</style>

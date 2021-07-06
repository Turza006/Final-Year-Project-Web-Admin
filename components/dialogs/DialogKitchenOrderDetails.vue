<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        <v-icon class="mr-2" color="white">
          mdi-book-open-outline
        </v-icon>
        Order Details
      </v-card-title>
      <KitchenOrderItemTableComponent v-if="!loading" :order-items="singleOrder.orderedItem" />
      <v-row v-else>
        <v-col align="center" align-self="center" class="pa-10">
          <v-progress-circular indeterminate />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { DIALOG_EVENT } from '~/utils/events'
import KitchenOrderItemTableComponent from '~/components/kitchen/KitchenOrderItemTableComponent'

export default {
  name: 'DialogKitchenOrderDetails',
  components: { KitchenOrderItemTableComponent },
  data () {
    return {
      dialog: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters('order', ['singleOrder'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_KITCHEN_ORDER_DETAILS, async (orderId) => {
      this.dialog = !this.dialog
      await this.getSingleOrderDetailsNetworkCall(orderId)
    })
  },
  methods: {
    ...mapActions('order', ['requestShowSingleOrderDetails']),
    async getSingleOrderDetailsNetworkCall (OrderId) {
      this.loading = true
      await this.requestShowSingleOrderDetails({
        $apollo: this.$apollo, OrderId, jwt: this.jwt
      })
      this.loading = false
    }
  }
}
</script>

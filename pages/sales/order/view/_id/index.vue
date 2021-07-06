<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Order Details
      <v-spacer />
      <v-btn class="primary white--text" small rounded>
        <v-icon small class="mr-1">mdi-printer</v-icon> Print
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="white">
      <OrderInvoiceComponent :loading="loading" :single-order="singleOrder" />
    </div>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import OrderInvoiceComponent from '~/components/order/OrderInvoiceComponent'

export default {
  name: 'OrderDetailsPage',
  components: { OrderInvoiceComponent },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('order', ['singleOrder'])
  },
  created () {
    this.loading = true
    this.requestShowSingleOrderDetails({
      $apollo: this.$apollo, OrderId: this.$route.params.id, jwt: this.jwt
    })
    this.loading = false
  },
  methods: {
    ...mapActions('order', ['requestShowSingleOrderDetails'])
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
    max-width="600"
  >
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Choose Order Type
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row class="pa-8">
          <v-col align="center" v-for="(item, index) in orderTypes" :key="index">
            <OrderTypeSingleItemComponent :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

import { ORDER_TYPES } from '~/utils/staticValues'
import OrderTypeSingleItemComponent from '~/components/order/OrderTypeSingleItemComponent'

export default {
  name: 'PageManageTable',
  components: { OrderTypeSingleItemComponent },
  data () {
    return {
      dialog: true,
      orderTypes: ORDER_TYPES
    }
  }
}
</script>

<style scoped>

</style>

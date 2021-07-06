<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      <v-row>
        <v-col>
          Manage Order
        </v-col>
        <v-col align="right">
          <v-select
            v-model="selectedStatus"
            :items="statusList"
            style="max-width: 180px;"
            label="Order Status"
            outlined
            dense
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <OrderDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import OrderDatatableComponent from '~/components/datatables/OrderDatatableComponent'
import { ORDER_STATUS } from '~/utils/apiStatusCode'

export default {
  name: 'PageManageOrder',
  components: { OrderDatatableComponent },
  data () {
    return {
      statusList: [],
      selectedStatus: 'ALL'
    }
  },
  created () {
    this.statusList.push('ALL')
    Object.values(ORDER_STATUS).map(status => this.statusList.push(status))
  }
}
</script>

<style scoped>

</style>

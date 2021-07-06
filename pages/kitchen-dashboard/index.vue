<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Kitchen Dashboard
    </v-card-title>
    <v-divider />
    <v-tabs v-model="tab">
      <v-tab>New Orders</v-tab>
      <v-tab>In-progress</v-tab>
      <v-tab>Finished Cooked</v-tab>
    </v-tabs>
    <v-divider />
    <KitchenOrderDatatableComponent :selected-status="selectedStatus" />
  </v-card>
</template>

<script>
import { ORDER_STATUS } from '~/utils/apiStatusCode'
import KitchenOrderDatatableComponent from '~/components/kitchen/KitchenOrderDatatableComponent'

export default {
  name: 'PageKitchenDashboard',
  components: { KitchenOrderDatatableComponent },
  data () {
    return {
      tab: 0,
      selectedStatusList: ORDER_STATUS
    }
  },
  computed: {
    selectedStatus () {
      return this.tab === 0 ? ORDER_STATUS.ACCEPTED : this.tab === 1 ? ORDER_STATUS.IN_PROGRESS : ORDER_STATUS.READY
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Stock
      <v-spacer />
      <v-btn class="primary white--text" small rounded to="/inventory/stock/add">
        Add Stock
      </v-btn>
    </v-card-title>
    <div class="pa-8">
      <StockDatatableComponents :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import StockDatatableComponents from '~/components/datatables/StockDatatableComponents'

export default {
  name: 'StockAllPage',
  components: {
    StockDatatableComponents
  },
  data () {
    return {
      // isProduction: true,
      selectedStatus: 'ACTIVE'
    }
  }
}
</script>

<style scoped>

</style>

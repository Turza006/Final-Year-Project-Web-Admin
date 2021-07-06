<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Purchase List
        <v-spacer/>
        <v-btn
          elevation="2"
          color="primary"
          to="/purchase/add"
        >
          Add Purchase
        </v-btn>
      </v-card-title>
      <div class="pa-8">
        <PurchaseDataTable :selected-status="'ACTIVE'" :purchase-data="purchaseData"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import PurchaseDataTable from '~/components/datatables/PurchaseDataTable'

export default {
  name: 'Index',
  components: {
    PurchaseDataTable
  },
  data () {
    return {
      purchaseData: {}
    }
  }
}
</script>

<style scoped>

</style>

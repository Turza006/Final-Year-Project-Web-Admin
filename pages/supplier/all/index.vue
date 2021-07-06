<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Supplier List
        <v-spacer/>
        <v-btn
          elevation="2"
          color="primary"
          to="/supplier/add"
        >
          Add Supplier
        </v-btn>
      </v-card-title>
      <div class="pa-8">
        <SupplierDataTables :selected-status="'ACTIVE'"/>
      </div>
    </v-card>
  </div>
</template>

<script>
import SupplierDataTables from '~/components/datatables/SupplierDataTables'
export default {
  name: 'Index',
  components: {
    SupplierDataTables
  },
  data () {
    return {
      restaurantId: ''
    }
  }
}
</script>

<style scoped>

</style>

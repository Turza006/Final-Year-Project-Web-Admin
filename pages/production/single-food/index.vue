<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <div class="pa-8">
      <FoodItemDatatableComponent :selected-status="selectedStatus" :is-production="isProduction" />
    </div>
  </v-card>
</template>

<script>
import FoodItemDatatableComponent from '~/components/datatables/FoodItemDatatableComponent'

export default {
  name: 'PageAddSingleFoodProduction',
  components: {
    FoodItemDatatableComponent
  },
  data () {
    return {
      isProduction: true,
      selectedStatus: 'ACTIVE'
    }
  }
}
</script>

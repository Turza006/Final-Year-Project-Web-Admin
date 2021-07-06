<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Food Items
      <v-spacer />
      <v-spacer />
      <v-btn class="primary white--text" small rounded to="/menu/food/add">
        Add Food
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <FoodItemDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import FoodItemDatatableComponent from '~/components/datatables/FoodItemDatatableComponent'
export default {
  name: 'PageManageFood',
  components: { FoodItemDatatableComponent },
  data () {
    return {
      selectedStatus: 'ACTIVE',
      statusList: ['ACTIVE', 'DRAFTED', 'DELETED']
    }
  }
}
</script>

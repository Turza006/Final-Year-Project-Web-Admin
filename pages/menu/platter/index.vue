<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Platter List
      <v-spacer />
      <v-btn class="primary white--text" small rounded to="/menu/platter/add">
        Add Platter
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <PlatterItemDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import PlatterItemDatatableComponent from '~/components/datatables/PlatterItemDatatableComponent'

export default {
  name: 'PageManagePlatter',
  components: { PlatterItemDatatableComponent },
  data () {
    return {
      selectedStatus: 'ACTIVE',
      statusList: ['ACTIVE', 'DRAFTED', 'DELETED']
    }
  }
}
</script>

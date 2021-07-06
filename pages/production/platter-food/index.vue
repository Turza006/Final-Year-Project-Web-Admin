<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <div class="pa-8">
      <PlatterItemDatatableComponent :selected-status="selectedStatus" :is-production="isProduction" />
    </div>
  </v-card>
</template>

<script>
import PlatterItemDatatableComponent from '~/components/datatables/PlatterItemDatatableComponent'

export default {
  name: 'PageAddPlatterProduction',
  components: {
    PlatterItemDatatableComponent
  },
  data () {
    return {
      isProduction: true,
      selectedStatus: 'ACTIVE'
    }
  }
}
</script>

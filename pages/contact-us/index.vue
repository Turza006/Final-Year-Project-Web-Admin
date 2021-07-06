<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Contact Us
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <ContactUsDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import { ORDER_STATUS } from '~/utils/apiStatusCode'
import ContactUsDatatableComponent from '~/components/datatables/ContactUsDatatableComponent'

export default {
  name: 'PageContactUs',
  components: { ContactUsDatatableComponent },
  data () {
    return {
      selectedStatus: ORDER_STATUS.PENDING
    }
  }
}
</script>

<style scoped>

</style>

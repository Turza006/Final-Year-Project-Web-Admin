<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Order Tables
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <OrderTableComponent :floor-no="floorNo" />
    </div>
  </v-card>
</template>

<script>
import OrderTableComponent from '~/components/OrderTableComponent'

export default {
  name: 'PageManageTable',
  components: { OrderTableComponent },
  data () {
    return {
      floorNo: this.$route.params.floorNo
    }
  }
}
</script>

<style scoped>

</style>

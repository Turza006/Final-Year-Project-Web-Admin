<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
    max-width="600"
  >
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Choose Order Type
      </v-card-title>
      <v-divider />
      <v-container>
        <v-row class="pa-8">
          <v-col v-for="(item, index) in floor" :key="index" align="center">
            <OrderFloorInfoComponent :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      dialog: true,
      floor: []
    }
  },
  computed: {
    ...mapGetters('restaurant', ['singleRestaurantFloors'])
  },
  created () {
    this.floor = this.singleRestaurantFloors
    console.log(this.singleRestaurantFloors)
  }
}
</script>

<style scoped>

</style>

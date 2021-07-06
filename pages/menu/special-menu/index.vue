<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Food Special Menu
      <v-spacer />
      <v-spacer />
      <v-btn class="primary white--text" small rounded to="/menu/special-menu/add">
        Add Special Menu
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <SpecialMenuDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import SpecialMenuDatatableComponent from '~/components/datatables/SpecialMenuDatatableComponent'

export default {
  name: 'SpecialMenu',
  components: {
    SpecialMenuDatatableComponent
  },
  data () {
    return {
      selectedStatus: 'ACTIVE',
      statusList: ['ACTIVE', 'DRAFTED', 'DELETED']
    }
  }
}
</script>

<style scoped>

</style>

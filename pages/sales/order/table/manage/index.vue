<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Manage Table
      <!--      <v-spacer/>
            <v-btn class="primary white&#45;&#45;text" small rounded to="/sales/order/table/create">
              Add Table
            </v-btn>-->
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <TableDatatableComponent selected-status="ACTIVE" />
    </div>
    <DialogEditTable />
  </v-card>
</template>

<script>
import TableDatatableComponent from '~/components/datatables/TableDatatableComponent'
import DialogEditTable from '~/components/dialogs/DialogEditTable'

export default {
  name: 'PageManageTable',
  components: {
    DialogEditTable,
    TableDatatableComponent
  }
}
</script>

<style scoped>

</style>

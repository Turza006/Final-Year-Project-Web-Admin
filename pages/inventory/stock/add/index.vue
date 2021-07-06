<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Add Stocks
      </v-card-title>
      <div class="pa-8">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-autocomplete
              v-model="value"
              :items="['Emon', 'Mridul']"
              dense
              outlined
              label="Supplier"
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-btn
              elevation="2"
              color="primary"
              light
            >
              Add Supplier
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            sm="6"
          >
            <v-text-field
              label="Invoice No"
              outlined
              dense
            />
          </v-col>

          <v-col
            sm="6"
          >
            <v-menu v-model="datemenu">
              <template #activator="{on}">
                <v-text-field
                  v-model="date"
                  label="Something"
                  outlined
                  dense
                  v-on="on"
                />
              </template>
              <v-date-picker v-model="date"/>
            </v-menu>
          </v-col>
        </v-row>
      </div>

      <v-spacer />
      <v-divider />
      <div class="pa-8">
        <StockDatatableComponents :selected-status="'ACTIVE'" />
      </div>
    </v-card>
  </div>
</template>

<script>
import StockDatatableComponents from '~/components/datatables/StockDatatableComponents'

export default {
  name: 'Index',
  components: {
    StockDatatableComponents
  }
  // data () {
  //   return {
  //     date: ''
  //   }
  // }
}
</script>

<style scoped>

</style>

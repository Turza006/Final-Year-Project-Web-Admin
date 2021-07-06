<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      <v-row>
        <v-col>
          Manage Reservation
        </v-col>
        <v-col align="right">
          <v-select
            v-model="selectedStatus"
            :items="statusList"
            style="max-width: 180px;"
            label="Reservation Status"
            outlined
            dense
          />
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <ReservationDatatableComponent :selected-status="selectedStatus" />
    </div>
  </v-card>
</template>

<script>
import ReservationDatatableComponent from '~/components/datatables/ReservationDatatableComponent'
import { RESERVATION_STATUS } from '~/utils/apiStatusCode'

export default {
  name: 'PageAllReservation',
  components: { ReservationDatatableComponent },
  data () {
    return {
      selectedStatus: RESERVATION_STATUS.PENDING,
      statusList: ['ALL']
    }
  },
  created () {
    Object.values(RESERVATION_STATUS).map(status => this.statusList.push(status))
  }
}
</script>

<template>
  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate color="primary" />
    </v-col>
  </v-row>
  <v-row v-else-if="!loading && allTable.length !== 0">
    <v-col
      v-for="(table) in allTable"
      :key="table.id"
    >
      <v-card
        class="mx-auto pa-2"
        max-width="240"
        @click="onClickOrderTable(table)"
      >
        <v-img
          :src="imgBaseUrl + table.tableImg"
          height="165px"
        />

        <v-card-title>
          {{ table.tableName }}
        </v-card-title>

        <v-card-subtitle>
          <v-row>
            <v-col class="pa-0 pl-3">
              Table No: {{ table.tableNo }}
            </v-col>
            <v-col class="pa-0" align-self="right" align="right">
              <v-chip
                x-small
                :color="getStatusColor(table.currentStatus)"
              >
                {{ table.currentStatus }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <span class="caption">Table Info</span>
        <v-divider />
        <p>
          <span class="body-2">Table Type: {{ table.tableType }}</span>
          <br>
          <span class="body-2">Chair: {{ table.tableChairNo }}</span>
        </p>
        <p v-if="table.currentStatus !== 'VACANT'">
          <span class="caption">Order Info:</span>
          <v-divider />
          <span class="body-2">Order No: {{ table.orderOngoing ? table.orderOngoing.orderNo : '' }}</span>
          <br>
          <span class="body-2">Total Price: {{ table.orderOngoing ? table.orderOngoing.totalPrice : '' }}</span>
        </p>
        <p v-if="table.Reservation.length > 0">
          Reservation: {{ table.Reservation }}
        </p>
      </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      {{ NO_TABLE_ADDED_YET }}
      <br>
      <br>
      <br>
      <span class="caption">
        {{ PLEASE_ADD_TABLE_FIRST }}
      </span>
      <v-btn
        class="mx-5"
        outlined
        color="primary"
        small
        to="/sales/order/table/manage"
      >
        {{ GO_TO_MANAGE_TABLE }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ORDER_TABLE_STATUS } from '~/utils/apiStatusCode'
import { BUTTON_TEXT, MESSAGE, TOAST } from '~/utils/strings'

export default {
  name: 'OrderTableComponent',
  props: {
    floorNo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      NO_TABLE_ADDED_YET: MESSAGE.NO_TABLE_ADDED_YET,
      PLEASE_ADD_TABLE_FIRST: MESSAGE.PLEASE_ADD_TABLE_FIRST,
      GO_TO_MANAGE_TABLE: BUTTON_TEXT.GO_TO_MANAGE_TABLE,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: false
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('table', ['allTable'])
  },
  async created () {
    console.log(this.floorNo)
    if (!this.$nuxt.isOffline) {
      this.loading = true
      await this.getAllTableItemNetworkCall()
      this.loading = false
    } else {
      this.$notifier.showMessage({
        content: TOAST.YOU_ARE_OFFLINE,
        color: 'error'
      })
    }
  },
  methods: {
    ...mapActions('table', ['requestGetAllTable']),
    async onClickOrderTable (table) {
      switch (table.currentStatus) {
        case ORDER_TABLE_STATUS.VACANT:
          await this.$store.commit('createOrder/SET_ORDER_TABLE', table)
          // await this.$router.push(`/sales/order/create?tableId=${table.id}`)
          await this.$router.push('/sales/order/create')
          break
        case ORDER_TABLE_STATUS.ON_GOING:
          await this.$router.push(`/sales/order/view/${table.orderOngoing.id}`)
          break
      }
    },
    getStatusColor (status) {
      switch (status) {
        case ORDER_TABLE_STATUS.VACANT:
          return 'green'
        case ORDER_TABLE_STATUS.ON_GOING :
          return 'error'
        default:
          return 'primary'
      }
    },
    async getAllTableItemNetworkCall () {
      this.loading = true
      await this.requestGetAllTable({
        $apollo: this.$apollo,
        RestaurantId: this.restaurantId,
        status: this.selectedStatus,
        floorName: this.floorNo,
        jwt: this.jwt
      })
      this.loading = false
    }
  }
}
</script>

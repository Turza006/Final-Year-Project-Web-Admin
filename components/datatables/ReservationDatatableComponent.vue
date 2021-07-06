<template>
  <v-data-table
    :headers="headers"
    :items="allReservation.Reservations"
    :search="search"
    :loading="loading"
    :options.sync="options"
    :server-items-length="allReservation.count"
    class="grey lighten-4"
  >
    <template #[`item.selectDate`]="{item}">
      <div>
        {{ item.selectDate }}
        <br>
        {{ item.selectTime }}
      </div>
    </template>
    <template #[`item.status`]="{item}">
      <v-chip small :color="_getColorByReservationStatus(item.status)">
        {{ item.status }}
      </v-chip>
    </template>
    <template #[`item.updatedAt`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            {{ item.updatedAt | _timeAgoFromMillis }}
          </span>
        </template>
        <span>{{ item.updatedAt | _milliToDate }}</span>
      </v-tooltip>
    </template>
    <template #[`item.actions`]="{item}">
      <v-btn
        v-if="item.status !== reservationStatusList.FINISH &&
          item.status !== reservationStatusList.CANCELED &&
          item.status !== reservationStatusList.DECLINED"
        class="ma-1"
        small
        outlined
        color="info"
        :to="`/reservation/edit/${item._id}`"
      >
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn
        v-if="item.status === reservationStatusList.PENDING"
        class="ma-1"
        small
        outlined
        color="success"
        @click="editReservation(item, reservationStatusList.ACCEPTED)"
      >
        <v-icon small class="mr-1">
          mdi-check
        </v-icon>
        Accept
      </v-btn>
      <v-btn
        v-if="item.status === reservationStatusList.ACCEPTED"
        class="ma-1"
        small
        outlined
        color="error"
        @click="editReservation(item, reservationStatusList.CANCELED)"
      >
        <v-icon small class="mr-1">
          mdi-cancel
        </v-icon>
        Cancel
      </v-btn>
      <v-btn
        v-if="item.status === reservationStatusList.PENDING"
        class="ma-1"
        small
        outlined
        color="error"
        @click="editReservation(item, reservationStatusList.DECLINED)"
      >
        <v-icon small class="mr-1">
          mdi-power-off
        </v-icon>
        Decline
      </v-btn>
      <v-btn
        v-if="item.status === reservationStatusList.ACCEPTED"
        class="ma-1"
        small
        outlined
        color="secondary"
        @click="editReservation(item, reservationStatusList.FINISH)"
      >
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Finish
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import StatusColorMixins from '~/mixins/StatusColorMixins'
import { API as api, RESERVATION_STATUS } from '~/utils/apiStatusCode'

export default {
  name: 'ReservationDatatableComponent',
  mixins: [DateConverterMixin, StatusColorMixins],
  props: {
    selectedStatus: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      reservationStatusList: RESERVATION_STATUS,
      loading: false,
      search: '',
      headers: [
        {
          text: 'Reservation Id',
          value: 'reservationId'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Phone No',
          value: 'phoneNumber'
        },
        {
          text: 'Person',
          value: 'totalPerson'
        },
        {
          text: 'User Comment',
          value: 'userComment'
        },
        {
          text: 'Admin Comment',
          value: 'adminComment'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Reservation Date',
          value: 'selectDate'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('reservation', ['allReservation'])
  },
  watch: {
    selectedStatus () {
      this.getAllReservationNetworkCall()
    },
    options: {
      deep: true,
      handler () {
        this.getAllReservationNetworkCall()
      }
    }
  },
  created () {
    this.getAllReservationNetworkCall()
  },
  methods: {
    ...mapActions('reservation', ['requestGetAllReservation', 'requestEditReservation']),
    async getAllReservationNetworkCall () {
      this.loading = true
      await this.requestGetAllReservation({
        $apollo: this.$apollo,
        RestaurantId: this.restaurantId,
        Status: this.selectedStatus !== 'ALL' ? this.selectedStatus : null,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    },
    async editReservation (item, status) {
      let msg = ''
      if (status === this.reservationStatusList.ACCEPTED) {
        msg = 'Are you sure, do you really want to ACCEPT  the reservation?'
      } else if (status === this.reservationStatusList.DECLINED) {
        msg = 'Are you sure, do you really want to DECLINE  the reservation?'
      }

      const userComment = item.userComment ? item.userComment : ''
      const adminComment = item.userComment ? item.adminComment : ''

      msg += '<div class="body-2"><br> Reservation ID: ' + item.reservationId + '<br>Customer Name: ' + item.name +
        '<br> Customer Phone:' + item.phoneNumber +
        '<br> Customer Email:' + item.email +
        '<br> Total Person:' + item.totalPerson +
        '<br> User Comment:' + userComment +
        '<br> Admin Comment:' + adminComment + '</div>'

      const value = await this.$confirm(msg)

      if (value) {
        this.loading = true

        const res = await this.requestEditReservation({
          $apollo: this.$apollo,
          payload: {
            status
          },
          ReservationId: item._id,
          jwt: this.jwt
        })
        if (res.code === api.SUCCESS) {
          await this.getAllReservationNetworkCall()
        }
        this.loading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
      }
    }
  }
}
</script>

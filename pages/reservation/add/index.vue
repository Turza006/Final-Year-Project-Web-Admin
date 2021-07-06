<template>
  <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
    <v-card-title>
      Add Reservation
    </v-card-title>
    <v-divider />
    <div class="text-center">
      <v-progress-circular v-if="loading" color="primary" class="ma-5" indeterminate/>
    </div>
    <v-form v-if="!loading && tableTypes.length !== 0" ref="form" class="pa-5">
      <v-layout>
        <v-flex xs4 md4 sm12 class="px-2">
          <label>Name: *</label>
          <v-text-field
            v-model="form.name"
            class="mt-2"
            prepend-inner-icon="mdi-account"
            placeholder="Name"
            color="primary"
            outlined
            dense
          />
        </v-flex>
        <v-flex xs4 md4 sm12 class="px-2">
          <label>Email: *</label>
          <v-text-field
            v-model="form.email"
            class="mt-2"
            prepend-inner-icon="mdi-gmail"
            placeholder="Email"
            color="primary"
            outlined
            dense
          />
        </v-flex>
        <v-flex xs4 md4 sm12 class="px-2">
          <label>Phone Number: *</label>
          <v-text-field
            v-model="form.phoneNumber"
            class="mt-2"
            prepend-inner-icon="mdi-phone"
            placeholder="Phone Number"
            color="primary"
            outlined
            dense
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex xs4 md4 sm6 class="px-2">
          <label>Total Person: *</label>
          <v-text-field
            v-model.number="form.totalPerson"
            class="mt-2"
            placeholder="Total person"
            type="number"
            prepend-inner-icon="mdi-account"
            dense
            outlined
          />
        </v-flex>
        <v-flex xs4 md4 sm6 class="px-2">
          <label>Select Date</label>
          <v-text-field
            v-model="form.selectDate"
            type="date"
            class="mt-2"
            placeholder="Select date"
            outlined
            dense
          />
        </v-flex>
        <v-flex xs4 md4 sm6 class="px-2">
          <label>Select Time</label>
          <v-text-field
            v-model="form.selectTime"
            class="mt-2"
            type="time"
            placeholder="Select Time"
            outlined
            dense
          />
        </v-flex>
      </v-layout>

      <v-layout
        v-for="(table, index) in reservationTables"
        :key="index"
        class="py-2 my-1 grey lighten-3"
      >
        <v-flex xs4 md4 sm6 class="px-2">
          <label>Table Type *</label>
          <v-text-field
            v-show="table.tableType !== ''"
            v-model="table.tableType"
            class="mt-2"
            prepend-inner-icon="mdi-account"
            dense
            outlined
            append-outer-icon="mdi-close"
            @click:append-outer="table.tableType = ''"
          />
          <v-select
            v-show="table.tableType === ''"
            v-model="table.tableType"
            :items="availableTableTypes"
            class="mt-2"
            label="Choose Table type"
            prepend-inner-icon="mdi-table-furniture"
            outlined
            dense
          />
        </v-flex>
        <v-flex xs4 md4 sm6 class="px-2">
          <label>Table Quantity * </label>
          <v-text-field
            v-model.number="table.qty"
            class="mt-2"
            placeholder="Table Quantity"
            type="number"
            prepend-inner-icon="mdi-account"
            dense
            outlined
          />
        </v-flex>
        <v-flex v-if="index !== 0" align-self-center class="text-right">
          <v-btn text color="error" class="mr-1" @click="removeReservationTable()">
            <v-icon class="mr-1">
              mdi-delete
            </v-icon>
            Remove
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout v-if="reservationTables.length < tableTypes.length" class="mt-2 mb-5">
        <v-flex>
          <v-btn small @click="addReservationTableType()">
            <v-icon small class="mr-2">
              mdi-table-large-plus
            </v-icon>
            Add Another Table Type
          </v-btn>
          <br>
          <span class="caption grey--text">
            You can choose multiple table type as your need.
          </span>
        </v-flex>
      </v-layout>

      <v-layout>
        <v-flex>
          <label>Admin Note: </label>
          <v-textarea
            v-model="form.adminComment"
            class="mt-2"
            placeholder="Admin Comment"
            dense
            outlined
          />
        </v-flex>
      </v-layout>

      <div class="text-center">
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="primary"
          class="mt-2 mb-5"
          @click="onFormSubmit()"
        >
          Create Reservation
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { TOAST } from '~/utils/strings'

export default {
  name: 'PageAddReservation',
  data () {
    return {
      loading: false,
      status: 'ACTIVE',
      reservationTables: [{
        tableType: '',
        qty: 1
      }],
      form: {
        restaurant: '',
        name: '',
        email: '',
        phoneNumber: '',
        totalPerson: 0,
        selectDate: '',
        selectTime: '',
        reservationTableType: {
          tableType: '',
          qty: 0
        },
        adminComment: ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('table', ['tableTypes']),
    availableTableTypes () {
      const types = []
      this.tableTypes.forEach((type) => {
        let matched = false
        this.reservationTables.forEach((table) => {
          if (table.tableType === type) {
            matched = true
          }
        })
        if (!matched) {
          types.push(type)
        }
      })
      return types
    }
  },

  async created () {
    this.form.restaurant = this.restaurantId
    this.loading = true
    await this.requestGetTableTypeByRestaurantId({
      $apollo: this.$apollo,
      RestaurantId: this.restaurantId,
      jwt: this.jwt,
      status: 'ACTIVE'
    })
    this.loading = false
  },
  methods: {
    ...mapActions('table', ['requestGetTableTypeByRestaurantId']),
    ...mapActions('reservation', ['requestCreateReservation']),
    addReservationTableType () {
      this.reservationTables.push({
        tableType: '',
        qty: 1
      })
    },
    removeReservationTable (index) {
      this.reservationTables.splice(index, 1)
    },
    async onFormSubmit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.reservationTableType = this.reservationTables
        const res = await this.requestCreateReservation({
          $apollo: this.$apollo,
          payload: this.form,
          jwt: this.jwt
        })
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
        if (res.code === 'success') {
          await this.$router.push('/reservation')
        }
      } else {
        this.$notifier.showMessage({
          content: TOAST.INVALID_INPUT,
          color: 'error'
        })
      }
    }
  }
}
</script>

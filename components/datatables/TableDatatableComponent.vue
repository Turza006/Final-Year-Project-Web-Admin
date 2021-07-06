<template>
  <v-data-table
    :headers="headers"
    :items="allTable"
    :loading="loading"
    class="grey lighten-4"
  >
    <template #[`item.tableImg`]="{ item }">
      <div>
        <v-avatar class="my-2">
          <img
            v-if="item.tableImg !== null"
            :src="imgBaseUrl + item.tableImg"
            :alt="item.tableName"
          >
          <v-icon v-else>
            mdi-table
          </v-icon>
        </v-avatar>
      </div>
    </template>
    <template #[`item.status`]="{ item }">
      <v-chip
        color="green"
        dark
        small
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template #[`item.actions`]="{ item }">
      <!--      <v-btn class="ma-1" small outlined color="info" :to="`/sales/order/table/edit/${item.id}`">
              <v-icon small class="mr-1">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>-->
      <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditTableDialog, item)">
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn class="ma-1" small outlined color="error" @click="deleteTable(item)">
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Delete
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'TableDatatableComponent',
  props: {
    selectedStatus: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleEditTableDialog: DIALOG_EVENT.TOGGLE_EDIT_TABLE,
      loading: false,
      headers: [
        {
          text: 'Image',
          value: 'tableImg'
        },
        {
          text: 'Table No',
          value: 'tableNo'
        },
        {
          text: 'Table Name',
          value: 'tableName'
        },
        {
          text: 'Table Type',
          value: 'tableType'
        },
        {
          text: 'Chair Quantity',
          value: 'tableChairNo'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('table', ['allTable'])
  },
  created () {
    this.$nuxt.$on(API_CALL_EVENT.GET_ALL_TABLE_NETWORK_CALL_EVENT, () => {
      this.getAllTableItemNetworkCall()
    })
    this.getAllTableItemNetworkCall()
  },
  methods: {
    ...mapActions('table', ['requestGetAllTable', 'requestDeleteTable']),
    async getAllTableItemNetworkCall () {
      this.loading = true
      await this.requestGetAllTable({
        $apollo: this.$apollo,
        RestaurantId: this.restaurantId,
        status: this.selectedStatus,
        jwt: this.jwt
      })
      this.loading = false
    },
    async deleteTable (item) {
      const value = await this.$confirm('Are you sure, do you really want to delete the table?<br><br>Table Name: ' + item.tableName)

      if (value) {
        this.loading = true

        const res = await this.requestDeleteTable({
          $apollo: this.$apollo,
          tableId: item.id,
          Restaurant: this.restaurantId,
          jwt: this.jwt
        })
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

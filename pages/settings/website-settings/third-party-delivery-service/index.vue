<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-truck-delivery-outline
        </v-icon>
        Third Party Delivery Service
        <v-spacer />
        <v-btn class="primary" rounded small @click="$nuxt.$emit(toggleAddThirdPartyServiceDialog)">
          <v-icon small>
            mdi-plus
          </v-icon>
          Add Delivery Service
        </v-btn>
      </v-card-title>
      <v-divider />
      <div class="pa-8">
        <v-data-table
          :headers="headers"
          :items="singleRestaurantThirdPartyServices"
          class="grey lighten-4"
        >
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
            <v-btn class="ma-1" small outlined color="error" @click="deleteOrderWith(item)">
              <v-icon small class="mr-1">
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <DialogAThirdPartyDeliveryService />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { DIALOG_EVENT } from '~/utils/events'
import DialogAThirdPartyDeliveryService from '~/components/dialogs/DialogThirdPartyDeliveryService'

export default {
  name: 'Page3rdPartyDeliveryService',
  components: { DialogAThirdPartyDeliveryService },
  data () {
    return {
      loading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleAddThirdPartyServiceDialog: DIALOG_EVENT.TOGGLE_ADD_THIRD_PARTY_SERVICES,
      offset: 0,
      limit: 10,
      headers: [
        {
          text: 'Service Logo',
          value: 'logo'
        },
        {
          text: 'Service Name',
          value: 'name'
        },
        {
          text: 'Link',
          value: 'link'
        },
        {
          text: 'Actions  ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 5,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  computed: {
    ...mapGetters('restaurant', ['restaurantUniqueName', 'singleRestaurantThirdPartyServices']),
    ...mapGetters('auth', ['jwt'])
  },
  async created () {
    if (this.singleRestaurantThirdPartyServices === null) { await this.$router.push('/owned-packages') }
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant', 'requestEditRestaurant']),
    async deleteOrderWith (item) {
      const value = await this.$confirm('Are you sure, do you really want to remove the third party service?<br><br>Name: ' + item.orderSystem.name)

      if (value) {
        const ordersWith = [...this.singleRestaurantThirdPartyServices]
        const index = ordersWith.indexOf(item)
        if (index !== -1) {
          ordersWith.splice(index, 1)
          this.loading = true
          const res = await this.requestEditRestaurant({
            $apollo: this.$apollo,
            payload: ordersWith,
            OrderWithId: item.id,
            jwt: this.jwt
          })
          this.loading = false
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
          if (res.code === 'success') {
            await this.requestGetSingleRestaurant({
              $apollo: this.$apollo, uniqueName: this.restaurantUniqueName, jwt: this.jwt
            })
          }
        } else {
          this.$notifier.showMessage({
            content: 'Invalid Order With Data',
            color: 'error'
          })
        }
      }
    }
  }
}
</script>

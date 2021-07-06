<template>
  <v-data-table
    :headers="headers"
    :items="allOwnedPackage"
    :search="search"
    :loading="loading"
    class="grey lighten-4"
  >
    <template #[`item.restaurant`]="{ item }">
      <v-row v-if="item.restaurant !== null && item.restaurant[0]" class="pa-5">
        <v-col class="pa-0">
          <v-avatar>
            <v-img :src="imgBaseUrl + item.restaurant[0].logo" />
          </v-avatar>
        </v-col>
        <v-col class="pa-0 pl-3" align-self="center">
          <h5>{{ item.restaurant[0].name }}</h5>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col align-self="center" class="caption grey--text">
          No Info
        </v-col>
      </v-row>
    </template>
    <template #[`item.status`]="{item}">
      <v-chip
        color="green"
        dark
        small
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template #[`item.startedFrom`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            <span>{{ item.startedFrom | _milliToDate }}</span>
          </span>
        </template>
        {{ item.startedFrom | _timeAgoFromMillis }}
      </v-tooltip>
    </template>
    <template #[`item.createdAt`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            {{ item.createdAt | _timeAgoFromMillis }}
          </span>
        </template>
        <span>{{ item.createdAt | _milliToDate }}</span>
      </v-tooltip>
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
    <template #[`item.actions`]="{ item }">
      <v-btn class="ma-1" small outlined color="info" @click="enterAdmin(item)">
        ENTER
        <v-icon small class="ml-1">
          mdi-arrow-right-thick
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import { TOAST } from '~/utils/strings'

export default {
  name: 'OwnedPackageDatatableComponentComponent',
  mixins: [DateConverterMixin],
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: true,
      selectedStatus: 'Active',
      search: '',
      headers: [
        {
          text: 'Restaurant',
          value: 'restaurant',
          align: 'center'
        },
        {
          text: 'Package Name',
          value: 'package.packageName'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Started From',
          value: 'startedFrom'
        },
        {
          text: 'Last Updated',
          value: 'updatedAt'
        },
        {
          text: 'Created At',
          value: 'createdAt'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('package', ['allOwnedPackage'])
  },
  async created () {
    this.loading = true
    await this.requestGetAllOwnedPackage({
      $apollo: this.$apollo,
      jwt: this.jwt
    })
    this.loading = false
  },
  methods: {
    ...mapActions('package', ['requestGetAllOwnedPackage']),
    ...mapActions('restaurant', ['requestGetSingleRestaurant']),
    async enterAdmin (item) {
      console.log('selected package: ', item)
      if (item.restaurant !== null && item.restaurant[0] !== undefined && item.restaurant[0]._id !== undefined) {
        this.loading = true
        const res = await this.requestGetSingleRestaurant({ $apollo: this.$apollo, uniqueName: item.restaurant[0].uniqueName, jwt: this.jwt })
        this.loading = false
        if (res.code === 'success') {
          await this.$store.commit('auth/SET_PACKAGE_ID_AND_RESTAURANT_ID', {
            restaurantId: item.restaurant[0]._id,
            packageId: item._id
          })
          await this.$router.push('/')
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: 'error'
          })
        }
      } else {
        console.log('owned package ------> error', item)
        this.$notifier.showMessage({
          content: TOAST.PACKAGE_INFO_NOT_VALID,
          color: 'error'
        })
      }
    }
  }
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="allContactUs.ContuctUsS"
    :search="search"
    :loading="loading"
    :options.sync="options"
    :server-items-length="allContactUs.count"
    class="grey lighten-4"
  >
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
<!--    <template #[`item.actions`]="{item}">
      <v-btn class="ma-1" x-small outlined color="secondary" :to="`/sales/order/view/${item.id}`">
        <v-icon x-small class="mr-1">
          mdi-eye
        </v-icon>
        Details
      </v-btn>
    </template>-->
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'

export default {
  name: 'ContactUsDatatableComponent',
  mixins: [DateConverterMixin],
  props: {
    selectedStatus: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: false,
      search: '',
      headers: [
        {
          text: 'Name',
          value: 'firstName'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'massage',
          value: 'massage'
        },
        {
          text: 'additionalDetails',
          value: 'additionalDetails'
        },
        {
          text: 'Updated at ',
          value: 'updatedAt'
        },
        {
          text: 'Created at ',
          value: 'createdAt'
        }
        // {
        //   text: 'Actions ',
        //   value: 'actions'
        // }
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
    ...mapGetters('contactUs', ['allContactUs'])
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.getAllFoodItemNetworkCall()
      }
    }
  },
  created () {
    this.getAllFoodItemNetworkCall()
  },
  methods: {
    ...mapActions('contactUs', ['requestGetAllContactUs']),
    async getAllFoodItemNetworkCall () {
      this.loading = true
      await this.requestGetAllContactUs({
        $apollo: this.$apollo,
        RestaurantID: this.restaurantId,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        status: this.selectedStatus,
        jwt: this.jwt
      })
      this.loading = false
    }
  }
}
</script>

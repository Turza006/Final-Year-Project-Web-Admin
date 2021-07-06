<template>
  <v-data-table
    :headers="headers"
    :items="singleRestaurantFoodItems.FoodItems"
    :search="search"
    :loading="loading"
    :options.sync="options"
    :server-items-length="singleRestaurantFoodItems.count"
    class="grey lighten-4"
  >
    <template #[`item.image`]="{ item }">
      <div>
        <v-avatar class="my-2">
          <img
            v-if="item.image !== null"
            :src="imgBaseUrl + item.image"
            :alt="item.name"
          >
          <v-icon v-else>
            mdi-account
          </v-icon>
        </v-avatar>
      </div>
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
      <v-btn class="ma-1" small outlined color="info" :to="`/menu/food/edit/${item.id}`">
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn class="ma-1" small outlined color="error" @click="deleteFood(item)">
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Delete
      </v-btn>
    </template>
    <template v-if="isProduction" #[`item.qty`]="{item}">
      <v-container fill-height fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="pa-0">
            <v-text-field
              v-model.number="item.qty"
              name="quantity"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-if="isProduction" #[`item.update`]="{item}">
      <v-btn class="ma-1" small outlined color="success" @click="updateProduction(item)">
        Update
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'

export default {
  name: 'FoodItemDatatableComponent',
  mixins: [DateConverterMixin],
  props: {
    selectedStatus: {
      type: String,
      required: true
    },
    isProduction: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: false,
      search: '',
      headers: [
        {
          text: 'Image',
          value: 'image'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Price',
          value: 'price'
        },
        {
          text: 'Discount',
          value: 'discount'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Updated at ',
          value: 'updatedAt'
        },
        {
          text: 'Actions ',
          value: 'actions'
        },
        {
          text: 'Quantity',
          value: 'qty'
        },
        {
          text: 'Update',
          value: 'update'
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
    ...mapGetters('food', ['singleRestaurantFoodItems']),
    ...mapGetters('platter', ['singleRestaurantPlatterItems'])
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
    // console.log(this.isProduction)
    if (!this.isProduction) {
      this.headers = this.headers.filter((header) => {
        return header.value !== 'qty' && header.value !== 'update'
      })
    }
    if (this.isProduction) {
      this.headers = this.headers.filter((header) => {
        return header.value !== 'actions'
      })
    }
    this.getAllFoodItemNetworkCall()
  },
  methods: {
    ...mapActions('food', ['requestGetSingleRestaurantFoodItemByStatus', 'requestDeleteFoodItem']),
    async getAllFoodItemNetworkCall () {
      // const filterInput = {
      //   searchParam: this.search,
      //   status: this.selectedStatus
      // }
      this.loading = true
      await this.requestGetSingleRestaurantFoodItemByStatus({
        $apollo: this.$apollo,
        RestaurantID: this.restaurantId,
        status: this.selectedStatus,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    },
    async deleteFood (item) {
      const value = await this.$confirm('Are you sure, do you really want to delete the menu food item?<br><br> Name: ' + item.name + '<br>Price: ' + item.price + '<br>Discount: ' + item.discount)

      if (value) {
        this.loading = true

        const res = await this.requestDeleteFoodItem({
          $apollo: this.$apollo,
          foodItemId: item.id,
          jwt: this.jwt
        })
        this.loading = false
        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: res.msg,
            color: 'success'
          })
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
        }
      }
    },
    // eslint-disable-next-line require-await
    async updateProduction (item) {
      // console.log(item.qty)
    }
  }
}
</script>

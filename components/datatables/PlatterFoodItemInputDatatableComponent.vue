<template>
  <v-row>
    <v-col>
      <v-autocomplete
        v-model="selectedFoodItemId"
        class="px-5 pb-0"
        outlined
        label="Select food items for platter"
        item-text="name"
        item-value="id"
        :items="singleRestaurantFoodItems.FoodItems"
        chips
        multiple
      >
        <template #selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            @click:close="remove(data.item)"
          >
            <v-avatar left>
              <v-img :src="imgBaseUrl + data.item.image" />
            </v-avatar>
            {{ data.item.name }}
          </v-chip>
        </template>
        <template #item="{ item }">
          <v-list-item-content>
            <v-list-item-title>
              <v-avatar>
                <v-img :src="imgBaseUrl + item.image" />
              </v-avatar>
              <span class="ml-2">
                {{ item.name }}
                <span class="caption grey--text ml-6">
                  Price: {{ item.price }}
                </span>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </template>
      </v-autocomplete>
      <div v-if="selectedFoodItems.length !== 0" class="px-5 pb-5">
        <v-data-table
          :headers="headers"
          :items="selectedFoodItems"
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
          <template #[`item.qty`]="{item}">
            <v-text-field
              v-model="item.qty"
              :rules="qtyRules"
              type="number"
              :value="1"
              class="mt-2"
              placeholder="Quantity"
              filled
              dense
              rounded
              @change="change"
            />
          </template>
          <template #[`item.actions`]="{item}">
            <v-btn icon color="error" @click="deleteFood(item)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </div>
      <div v-else class="px-5 pb-2">
        <span class="warning--text subtitle-2">No food item selected yet.</span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'

export default {
  name: 'PlatterFoodItemInputDatatableComponent',
  mixins: [DateConverterMixin],
  props: {
    selectedStatus: {
      type: String,
      required: true
    },
    foodItems: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      selectedFoodItemId: [],
      selectedFoodItems: [],
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
          text: 'Qty',
          value: 'qty'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ],
      qtyRules: [
        v => !!v || 'Quantity is required',
        v => (parseFloat(v) >= 0) || 'The quantity cannot be negative.'
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
    ...mapGetters('food', ['singleRestaurantFoodItems'])
  },
  watch: {
    selectedFoodItemId (newValue, oldValue) {
      console.log('watch --> selectedFoodItemId: oldValue: ', oldValue)
      console.log('watch --> selectedFoodItemId: newValue: ', newValue)
      if (oldValue.length > newValue.length) {
        // remove item
        oldValue.forEach((item) => {
          if (!newValue.includes(item)) {
            console.log('watch --> item removed', item)
            this.deleteFood(this.singleRestaurantFoodItems.FoodItems.find(element => element.id === item))
            this.$nuxt.$emit('remove', item)
          } else {
            console.log('watch --> item removed but deleted item not found')
          }
        })
      } else {
        newValue.forEach((item) => {
          if (!oldValue.includes(item)) {
            console.log('watch --> item added', item)
            this.addFoodItemInSelectionList(this.singleRestaurantFoodItems.FoodItems.find(element => element.id === item))
          }
        })
      }
    },
    options: {
      deep: true,
      handler () {
        this.getAllFoodItemNetworkCall()
      }
    }
  },
  created () {
    console.log(this.foodItems.length)
    if (this.foodItems.length > 0) {
      for (let i = 0; i < this.foodItems.length; i++) {
        this.selectedFoodItems.push({
          ...this.foodItems[i].foodItem,
          qty: this.foodItems[i].qty
        })
      }
    }
    this.getAllFoodItemNetworkCall()
  },
  methods: {
    ...mapActions('food', ['requestGetSingleRestaurantFoodItemByStatus', 'requestDeleteFoodItem']),
    change () {
      console.log('Hello')
      this.$nuxt.$emit('updateItem', this.selectedFoodItems)
    },
    select (item) {
      console.log('selected------>>', item)
    },
    remove (item) {
      console.log('remove-->>', item)
      const index = this.selectedFoodItemId.indexOf(item.id)
      if (index >= 0) {
        this.selectedFoodItemId.splice(index, 1)
      }
    },
    addFoodItemInSelectionList (item) {
      console.log('selected item: ', item)
      item.qty = 1
      item.subtotal = (item.price * item.qty) - item.discount
      this.selectedFoodItems.push(item)
      this.$nuxt.$emit('addItem', this.selectedFoodItems)
      console.log(this.selectedFoodItems)
    },
    deleteFood (item) {
      const index = this.selectedFoodItems.indexOf(item)
      this.selectedFoodItems.splice(index, 1)
      this.$nuxt.$emit('deleteItem', this.selectedFoodItems)
      this.remove(item)
    },
    async getAllFoodItemNetworkCall () {
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
    }
  }
}
</script>

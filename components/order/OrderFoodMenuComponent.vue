<template>
  <div>
    <v-text-field
      type="search"
      outlined
      rounded
      dense
      label="Search menu item"
      class="ma-2"
      hide-details
    />
    <v-tabs v-model="tabs">
      <v-tab>
        All
      </v-tab>
      <v-tab
        v-for="category in allCategory.MenuCategories"
        :key="category.id"
        @click="selectedCategoryId = category.id"
      >
        {{ category.category }}
      </v-tab>
    </v-tabs>
    <v-tabs v-model="selectedItemTypeTabs" vertical>
      <v-tab>
        Food Item
      </v-tab>
      <v-tab>
        Platter Item
      </v-tab>

      <v-tabs-items v-if="selectedItemType === 'Food'" v-model="tabs">
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="item in singleRestaurantFoodItems.FoodItems" :key="item.id">
                <SingleFoodItemComponent :item="item" item-type="Food"/>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item v-for="category in allCategory.MenuCategories" :key="category.id">
          <v-container fluid>
            <v-row v-if="filteredFoodItems.length">
              <v-col v-for="item in filteredFoodItems" :key="item.id" class="ma-2">
                <SingleFoodItemComponent :item="item" item-type="Food"/>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p class="grey--text pa-5 font-weight-light">
                  {{ NO_ITEM_ADDED_IN_THIS_CATEGORY }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
      <v-tabs-items v-if="selectedItemType === 'Platter'" v-model="tabs">
        <v-tab-item>
          <v-container fluid>
            <v-row>
              <v-col v-for="item in singleRestaurantPlatterItems.PlatterItems" :key="item.id">
                <SingleFoodItemComponent :item="item" item-type="Platter"/>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item v-for="category in allCategory.MenuCategories" :key="category.id">
          <v-container fluid>
            <v-row v-if="filteredPlatterItems.length">
              <v-col v-for="item in filteredPlatterItems" :key="item.id" class="ma-2">
                <SingleFoodItemComponent :item="item" item-type="Platter"/>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col>
                <p class="grey--text pa-5 font-weight-light">
                  {{ NO_ITEM_ADDED_IN_THIS_CATEGORY }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { FOOD_ITEM_STATUS, MENU_CATEGORY_STATUS } from '~/utils/apiStatusCode'
import { MESSAGE, TOAST } from '~/utils/strings'
import SingleFoodItemComponent from '~/components/order/SingleFoodItemComponent'

export default {
  name: 'OrderFoodMenuComponent',
  components: { SingleFoodItemComponent },
  data () {
    return {
      selectedItemTypeTabs: null,
      selectedItemType: 'Food',
      tabs: null,
      selectedCategoryId: '',
      NO_ITEM_ADDED_IN_THIS_CATEGORY: MESSAGE.NO_ITEM_ADDED_IN_THIS_CATEGORY
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('restaurant', ['restaurantId']),
    ...mapGetters('category', ['allCategory']),
    ...mapGetters('food', ['singleRestaurantFoodItems']),
    ...mapGetters('platter', ['singleRestaurantPlatterItems']),
    filteredFoodItems () {
      const filteredItems = []
      if (this.tabs) {
        this.singleRestaurantFoodItems.FoodItems.forEach((item) => {
          if (item.menuCategory.id === this.selectedCategoryId) {
            filteredItems.push(item)
          }
        })
      }
      return filteredItems
    },
    filteredPlatterItems () {
      const filteredItems = []
      if (this.tabs) {
        this.singleRestaurantPlatterItems.PlatterItems.forEach((item) => {
          if (item.menuCategory.id === this.selectedCategoryId) {
            filteredItems.push(item)
          }
        })
      }
      return filteredItems
    }
  },
  watch: {
    selectedItemTypeTabs (newVal, oldVal) {
      console.log(newVal)
      if (newVal === 1) {
        this.selectedItemType = 'Platter'
      } else {
        this.selectedItemType = 'Food'
      }
      // console.log(oldVal)
    }
  },
  async created () {
    await this.getSingleRestaurantMenuCategory()
    await this.requestGetSingleRestaurantFoodItemByStatus({
      $apollo: this.$apollo,
      RestaurantID: this.restaurantId,
      status: FOOD_ITEM_STATUS.ACTIVE,
      jwt: this.jwt
    })
    await this.requestGetSingleRestaurantPlatterItems({
      $apollo: this.$apollo,
      RestaurantID: this.restaurantId,
      status: FOOD_ITEM_STATUS.ACTIVE,
      jwt: this.jwt
    })
    console.log(this.singleRestaurantPlatterItems)
  },
  methods: {
    ...mapActions('category', ['requestSingleRestaurantMenuCategory']),
    ...mapActions('food', ['requestGetSingleRestaurantFoodItemByStatus']),
    ...mapActions('platter', ['requestGetSingleRestaurantPlatterItems']),
    changeSelectedItem (itemType) {
      this.selectedItemType = itemType
    },
    async getSingleRestaurantMenuCategory () {
      if (!this.$nuxt.isOffline) {
        await this.requestSingleRestaurantMenuCategory({
          $apollo: this.$apollo,
          restaurantId: this.restaurantId,
          status: MENU_CATEGORY_STATUS.ACTIVE,
          jwt: this.jwt
        })
      } else {
        this.$notifier.showMessage({
          content: TOAST.YOU_ARE_OFFLINE,
          color: 'error'
        })
      }
    }
  }
}
</script>

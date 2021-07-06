<template>
  <div class="my-1">
    <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
      <v-card-title>
        Edit Food
      </v-card-title>
      <v-divider />
      <v-form ref="form" class="pa-10">
        <v-layout>
          <v-flex xs12 md6 sm6>
            <label class="ml-3">Image *</label>
            <ImageInput class="my-4" :image-link="form.image" @changeImagelink="updateImageUrl($event)" />
          </v-flex>
          <v-flex xs12 md6 sm6 class="pl-8">
            <label class="ml-3">Name *</label>
            <v-text-field
              v-model.trim="form.name"
              :rules="nameRules"
              type="text"
              class="mt-2"
              placeholder="Name"
              filled
              dense
              rounded
            />
            <v-layout>
              <v-flex xs12 md12 sm12 class="p r-4">
                <label class="ml-3">Price *</label>
                <v-text-field
                  v-model="form.price"
                  :rules="priceRules"
                  type="number"
                  min="1"
                  class="mt-2"
                  placeholder="price min"
                  filled
                  dense
                  rounded
                />
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <label class="ml-3">Serve Time</label>
                <v-text-field
                  v-model="form.serveTime"
                  class="mt-2"
                  placeholder="Serve Time"
                  filled
                  dense
                  rounded
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md6 sm6>
            <label class="ml-3">Menu Category *</label>
            <v-select
              v-model="selectedCategory"
              :items="allCategory.MenuCategories"
              :rules="selectedCategoryRules"
              :loading="loading"
              class="mt-2"
              filled
              rounded
              dense
              placeholder="Menu Category"
              item-text="category"
              item-value="id"
            />
          </v-flex>
        </v-layout>
        <label class="ml-3">Description </label>
        <v-textarea
          v-model="form.detailsInfo"
          class="mt-2"
          placeholder="Details Info"
          dense
          filled
        />
        <v-row>
          <v-col>
            <label class="ml-3">Food Type</label>
            <v-select
              v-model="selectedFoodType"
              :items="foodType"
              item-text="typeName"
              outlined
              item-value="id"
              @change="changeType"
            />
          </v-col>
          <v-col>
            <label class="ml-3">Food Subtype</label>
            <v-select
              v-model="selectedFoodSubType"
              :items="foodSubType"
              item-text="subTypeName"
              outlined
              item-value="id"
              @change="changeSubType"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label class="ml-3">Discount </label>
            <v-text-field
              v-model.trim="form.discount"
              type="Number"
              class="mt-2"
              placeholder="Discount"
              dense
              filled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-checkbox
              v-model="hasVariantTracker"
              class="mt-2"
              label="Has Variant"
              dense
              filled
            />
          </v-col>
          <v-col>
            <v-checkbox
              v-model="form.isSpecial"
              type="Number"
              class="mt-2"
              label="Is Special"
              dense
              filled
            />
          </v-col>
          <v-col>
            <v-checkbox
              v-model="form.isOccasional"
              type="Number"
              class="mt-2"
              label="Is Occasional"
              dense
              filled
            />
          </v-col>
          <v-col>
            <v-checkbox
              v-model="form.isOffered"
              type="Number"
              class="mt-2"
              label="Is Offered"
              dense
              filled
            />
          </v-col>
        </v-row>
        <v-row v-if="form.hasVariant">
          <v-col>
            <h3>Variants</h3>
            <v-divider />
            <v-container v-for="(variant, index) in form.variant" :key="index" class="pa-0 mt-8">
              <v-layout>
                <v-flex xs6 md6 sm12 class="mr-5">
                  <label>Variants Name:</label>
                  <v-text-field
                    v-model="variant.variantName"
                    :rules="variantNameRules"
                    class="mt-2"
                    type="text"
                    placeholder="Variant Name"
                    filled
                    dense
                  />
                </v-flex>
                <v-flex xs6 md6 sm12 class="ml-5">
                  <label class="ml-2">Variants Price:</label>
                  <v-text-field
                    v-model="variant.price"
                    :rules="variantPriceRules"
                    class="mt-2 mx-2"
                    type="number"
                    placeholder="Variant Name"
                    filled
                    dense
                    :append-outer-icon="index !== 0 ? 'mdi-delete' : ''"
                    @click:append-outer="removeVariant(index)"
                  />
                </v-flex>
              </v-layout>
            </v-container>
            <v-btn small color="primary" class="float-right mr-10" @click="addVariant()">
              <v-icon small>
                mdi-plus
              </v-icon>
              Add Variant
            </v-btn>
          </v-col>
        </v-row>
        <div class="text-center mt-5">
          <v-btn class="white--text primary" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            Update
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { MENU_CATEGORY_STATUS } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'

export default {
  name: 'PageAddFood',
  data () {
    return {
      loading: false,
      foodItemId: this.$route.params.id,
      filterInput: {
        // searchParam: '',
        status: MENU_CATEGORY_STATUS.ACTIVE
      },
      foodType: [],
      selectedFoodType: null,
      foodSubType: [],
      selectedFoodSubType: null,
      subcategoryList: [],
      selectedCategory: null,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      search: '', /* search is for food item */
      hasVariantTracker: false,
      form: {
        // menuUniqueNumber: 0,
        name: '',
        image: '',
        detailsInfo: '',
        price: 0,
        menuCategory: '',
        manufactureDate: '',
        foodType: '',
        foodSubType: '',
        hasVariant: false,
        variant: [],
        expiryDate: '',
        discount: 0,
        serveTime: '',
        isSpecial: false,
        isOccasional: false,
        isOffered: false
      },
      finalForm: {},
      selectedCategoryRules: [
        v => !!v || 'Category is required'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length >= 2 || 'Name must be at least 2 characters or more.'
      ],
      detailsInfoRules: [
        v => !!v || 'description is required'
      ],
      priceRules: [
        v => !!v || 'minimum price is required'
      ],
      foodTypeRules: [
        v => !!v || 'food type is required'
      ],
      foodSubTypeRules: [
        v => !!v || 'food subtype is required'
      ],
      discountRules: [
        v => (parseFloat(v) > parseFloat(this.form.platterPrice)) || 'discount amount must be lower or equal than platter price'
      ],
      variantNameRules: [
        v => !!v || 'Variant name is required'
      ],
      variantPriceRules: [
        v => !!v || 'Variant price is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('category', ['allCategory']),
    ...mapGetters('food', ['singleFoodItem']),
    ...mapGetters('type', ['allType'])
  },
  watch: {
    selectedCategory (newValue) {
      this.form.menuCategory = newValue
    },
    hasVariantTracker (newValue) {
      if (newValue) {
        this.addVariant()
        this.form.hasVariant = true
      } else {
        this.form.variant = []
        this.form.hasVariant = false
      }
    }
  },
  async created () {
    this.loading = true
    await this.requestSingleRestaurantMenuCategory({
      $apollo: this.$apollo,
      restaurantId: this.restaurantId,
      status: MENU_CATEGORY_STATUS.ACTIVE,
      jwt: this.jwt
    })
    await this.requestGetSingleFoodItem({
      $apollo: this.$apollo,
      FoodItemId: this.foodItemId,
      jwt: this.jwt
    })
    await this.requestGetAllTypes({
      $apollo: this.$apollo,
      payload: {
        restaurant: this.restaurantId
      },
      jwt: this.jwt
    })
    this.foodType = this.allType.MenuTypes
    console.log(this.foodType)
    this.selectedFoodType = this.singleFoodItem.foodType
    this.selectedFoodSubType = this.singleFoodItem.foodSubType
    const typeIndex = this.foodType.findIndex(foodType => foodType.id === this.selectedFoodType.id)
    console.log(this.selectedFoodSubType)
    this.foodSubType = this.foodType[typeIndex].subTypes

    // console.log(this.selectedFoodType)
    this.form = {
      name: this.singleFoodItem.name,
      image: this.singleFoodItem.image,
      detailsInfo: this.singleFoodItem.detailsInfo,
      price: this.singleFoodItem.price,
      menuCategory: this.singleFoodItem.menuCategory,
      manufactureDate: this.singleFoodItem.manufactureDate,
      foodType: this.singleFoodItem.foodType,
      foodSubType: this.singleFoodItem.foodSubType,
      hasVariant: this.singleFoodItem.hasVariant,
      variant: this.singleFoodItem.variant,
      expiryDate: this.singleFoodItem.expiryDate,
      discount: this.singleFoodItem.discount,
      serveTime: this.singleFoodItem.serveTime,
      isSpecial: this.singleFoodItem.isSpecial,
      isOccasional: this.singleFoodItem.variant.isOccasional,
      isOffered: this.singleFoodItem.isOffered
    }

    this.selectedCategory = this.singleFoodItem.menuCategory.id
    this.loading = false
    this.form.foodType = this.form.foodType.id
    this.form.foodSubType = this.form.foodSubType.id
    console.log('new============>', this.foodType)
  },
  methods: {
    ...mapActions('category', ['requestSingleRestaurantMenuCategory']),
    ...mapActions('type', ['requestGetAllTypes']),
    ...mapActions('food', ['requestEditFoodItem', 'requestGetSingleFoodItem']),
    changeType (value) {
      this.form.foodType = value
      const typeIndex = this.foodType.findIndex(foodType => foodType.id === value)
      console.log(typeIndex)
      if (typeIndex !== -1) {
        const singleType = this.foodType[typeIndex]
        console.log(singleType)
        this.selectedFoodType = singleType
        // this.form.foodType = singleType.id
        this.foodSubType = singleType.subTypes
        this.selectedFoodSubType = this.foodSubType[0]
        this.form.foodSubType = this.selectedFoodSubType
      }
    },
    changeSubType (value) {
      this.form.foodSubType = value
    },
    updateImageUrl (url) {
      this.form.image = url
    },
    addVariant () {
      this.form.variant.push({
        variantName: '',
        price: 0
      })
    },
    removeVariant (index) {
      this.form.variant.splice(index, 1)
    },
    async submitForm () {
      if (this.form.image === '') {
        this.$notifier.showMessage({
          content: 'image is required',
          color: 'error'
        })
        return
      }
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.price = parseFloat(this.form.price)
        this.form.discount = parseFloat(this.form.discount)
        this.form.restaurant = this.restaurantId

        const res = await this.requestEditFoodItem({
          $apollo: this.$apollo,
          payload: this.form,
          foodItemId: this.foodItemId,
          jwt: this.$store.state.auth.jwt
        })
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
        if (res.code === 'success') {
          await this.$router.push('/menu/food')
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

<style scoped>

</style>

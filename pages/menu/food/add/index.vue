<template>
  <div class="my-1">
    <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
      <v-card-title>
        Add Food
      </v-card-title>
      <v-divider />
      <v-form ref="form" class="pa-10">
        <v-layout>
          <v-flex xs12 md6 sm6>
            <label class="ml-3">Image *</label>
            <ImageInput class="my-4" @changeImagelink="updateImageUrl($event)" />
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
            <!--            <v-text-field-->
            <!--              v-model="form.foodType"-->
            <!--              class="mt-2"-->
            <!--              placeholder="Food Type"-->
            <!--              dense-->
            <!--              filled-->
            <!--            />-->
            <v-select
              v-model="selectedFoodType"
              :items="foodType"
              item-text="typeName"
              value="id"
              class="mt-2"
              dense
              outlined
              @change="changeType"
            />
          </v-col>
          <v-col>
            <label class="ml-3">Food Subtype</label>
            <v-select
              v-model="selectedFoodSubType"
              :items="foodSubType"
              item-text="subTypeName"
              item-value="id"
              class="mt-2"
              dense
              outlined
              @change="changeSubType"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label class="ml-3">Discount </label>
            <v-text-field
              v-model.number="form.discount"
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
                    v-model.number="variant.price"
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
            Add Food
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
      filterInput: {
        // searchParam: '',
        status: MENU_CATEGORY_STATUS.ACTIVE
      },
      selectedCategory: null,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      search: '', /* search is for food item */
      hasVariantTracker: false,
      foodType: [],
      foodSubType: [],
      selectedFoodType: {},
      selectedFoodSubType: {},
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
    await this.requestGetAllTypes({
      $apollo: this.$apollo,
      payload: {
        restaurant: this.restaurantId,
        limit: 100,
        offset: 0
      },
      status: MENU_CATEGORY_STATUS.ACTIVE,
      jwt: this.jwt
    })
    this.foodType = this.allType.MenuTypes
    this.selectedFoodType = this.foodType[0]
    // console.log(this.foodType[0].subTypes)
    this.foodSubType = this.foodType[0].subTypes
    // console.log()
    this.selectedFoodSubType = this.foodSubType[0]
  },
  methods: {
    ...mapActions('category', ['requestSingleRestaurantMenuCategory']),
    ...mapActions('type', ['requestGetAllTypes']),
    ...mapActions('food', ['requestCreateFoodItem']),
    changeSubType (subType) {
      const subTypeIndex = this.foodSubTypeDetails.findIndex(foodSubType => foodSubType.subTypeName === subType)
      this.selectedFoodSubType = this.foodSubTypeDetails[subTypeIndex]
      this.form.foodSubType = this.selectedFoodSubType.id
      console.log(this.selectedFoodSubType)
    },
    changeType (type) {
      // console.log(this.foodTypeDetails)
      const typeIndex = this.foodType.findIndex(foodType => foodType.typeName === type)
      console.log(typeIndex)
      if (typeIndex !== -1) {
        const singleType = this.foodType[typeIndex]
        console.log(singleType)
        this.selectedFoodType = singleType
        this.form.foodType = singleType.id
        this.foodSubType = singleType.subTypes
        this.selectedFoodSubType = this.foodSubType[0]
        this.form.foodSubType = this.selectedFoodSubType
      }
    },
    updateImageUrl (url) {
      // console.log('updateImageUrl--->>>', url)
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

        const res = await this.requestCreateFoodItem({
          $apollo: this.$apollo,
          payload: this.form,
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

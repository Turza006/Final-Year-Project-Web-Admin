<template>
  <div class="my-1">
    <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
      <v-card-title>
        Edit Platter
      </v-card-title>
      <v-divider />
      <v-form ref="form" class="pa-10">
        <!--        {{ form }}-->
        <v-layout>
          <v-flex xs12 md4 sm6>
            <label class="ml-3">Image *</label>
            <ImageInput class="my-4" @changeImagelink="updateImageUrl($event)" />
          </v-flex>
          <v-flex xs12 md8 sm6>
            <v-layout>
              <v-flex xs12 md6 sm6 class="pr-4">
                <label class="ml-3">Platter Name *</label>
                <v-text-field
                  v-model="form.name"
                  :rules="nameRules"
                  type="text"
                  class="mt-2"
                  placeholder="Name"
                  filled
                  dense
                  rounded
                />
              </v-flex>
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
            <v-layout>
              <v-flex xs12 md6 sm6 class="pr-4">
                <label class="ml-3">Platter Type</label>
                <v-select
                  v-model="selectedFoodType"
                  :items="foodType"
                  item-value="id"
                  item-text="typeName"
                  class="mt-2"
                  dense
                  outlined
                  @change="changeType"
                />
              </v-flex>
              <v-flex xs12 md6 sm6>
                <label class="ml-3">Platter Subtype</label>
                <v-select
                  v-model="selectedFoodSubType"
                  :items="foodSubType"
                  item-value="id"
                  item-text="subTypeName"
                  class="mt-2"
                  dense
                  outlined
                  @change="changeType"
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md4 sm12 class="pr-4">
            <label class="ml-3">Platter Price *</label>
            <v-text-field
              v-model="form.price"
              :rules="priceRules"
              type="number"
              min="1"
              class="mt-2"
              placeholder="platter price"
              filled
              dense
              rounded
            />
          </v-flex>
          <v-flex xs12 md4 sm12 class="pr-4">
            <label class="ml-3">Discount </label>
            <v-text-field
              v-model="form.discount"
              :rules="discountRules"
              type="Number"
              class="mt-2"
              placeholder="Discount"
              rounded
              dense
              filled
            />
          </v-flex>
          <v-flex xs12 md4 sm12>
            <label class="ml-3">Platter Serve Time</label>
            <v-text-field
              v-model="form.serveTime"
              class="mt-2"
              placeholder="Platter Serve Time"
              filled
              dense
              rounded
            />
          </v-flex>
        </v-layout>
        <label class="ml-3">Platter Description * </label>
        <v-textarea
          v-model="form.detailsInfo"
          :rules="detailsInfoRules"
          class="mt-2"
          placeholder="Details Info"
          dense
          filled
        />

        <v-row>
          <v-col>
            <span class="caption">Food Items:</span>
            <v-divider />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card v-if="singlePlatterItem.items">
              <PlatterFoodItemInputDatatableComponent selected-status="ACTIVE" :food-items="singlePlatterItem.items" />
            </v-card>
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
              @change="!hasVariantTracker"
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
        <v-row v-if="hasVariantTracker">
          <v-col>
            <h3>Variants</h3>
            <v-divider />
            <v-container v-for="(variant, index) in variants" :key="index" class="pa-0 mt-8">
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
            Update
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API, MENU_CATEGORY_STATUS } from '~/utils/apiStatusCode'
import PlatterFoodItemInputDatatableComponent from '~/components/datatables/PlatterFoodItemInputDatatableComponent'
import ObjectFromVuex from '~/mixins/ObjectFromVuex'

export default {
  name: 'PageEditPlatter',
  components: { PlatterFoodItemInputDatatableComponent },
  mixins: [ObjectFromVuex],
  data () {
    return {
      loading: false,
      platterItemId: this.$route.params.id,
      filterInput: {
        // searchParam: '',
        status: MENU_CATEGORY_STATUS.ACTIVE
      },
      selectedFoodItems: [],
      foodType: [],
      foodSubType: [],
      selectedFoodType: {},
      selectedFoodSubType: {},
      selectedCategory: null,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      search: '', /* search is for food item */
      hasVariantTracker: false,
      variants: [],
      form: {
        // platterMenuUniqueNumber: 0,
        name: '',
        image: '',
        detailsInfo: '',
        menuCategory: '',
        price: '',
        foodType: '',
        foodSubType: '',
        hasVariant: false,
        variant: [{
          variantName: '',
          price: 0
        }],
        quantity: '',
        manufactureDate: '',
        expiryDate: '',
        discount: '',
        serveTime: '',
        items: [],
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
        v => !!v || 'price is required'
      ],
      platterTypeRules: [
        v => !!v || 'platter type is required'
      ],
      platterSubTypeRules: [
        v => !!v || 'platter subtype is required'
      ],
      discountRules: [
        v => (parseFloat(v) >= 0) || 'The discount doesn\'t have to be negative.',
        v => (parseFloat(v) < parseFloat(this.form.price)) || 'invalid discount, discount amount must be lower or equal than platter price'
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
    ...mapGetters('platter', ['singlePlatterItem']),
    ...mapGetters('type', ['allType'])
  },
  watch: {
    // selectedCategory (newValue) {
    //   this.form.menuCategory = newValue
    // },
    hasVariantTracker (newValue) {
      console.log(newValue)
      if (newValue === true) {
        this.addVariant()
        this.form.hasVariant = true
      } else {
        this.form.hasVariant = false
      }
      // this.form.variant.push({
      //   variantName: '',
      //   price: 0
      // })
    }
  },
  async created () {
    console.log('Form=====================>', this.form)
    this.$nuxt.$on('addItem', (item) => {
      this.selectedFoodItems = item
    })
    this.$nuxt.$on('deleteItem', (item) => {
      this.selectedFoodItems = item
    })
    this.$nuxt.$on('updateItem', (item) => {
      console.log('Event Updated')
      this.selectedFoodItems = item
    })

    this.loading = true
    await this.requestSingleRestaurantMenuCategory({
      $apollo: this.$apollo,
      restaurantId: this.restaurantId,
      status: MENU_CATEGORY_STATUS.ACTIVE,
      jwt: this.jwt
    })
    await this.requestGetSinglePlatterItem({
      $apollo: this.$apollo,
      PlatterItemId: this.platterItemId,
      jwt: this.jwt
    })
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

    this.form = this.objectParse(this.singlePlatterItem, this.form)
    this.variants.push(...this.form.variant)
    this.hasVariantTracker = this.form.hasVariant
    console.log(this.form.hasVariant)
    this.form.items = []
    for (let i = 0; i < this.singlePlatterItem.items.length; i++) {
      this.selectedFoodItems.push({
        ...this.singlePlatterItem.items[i].foodItem,
        qty: this.singlePlatterItem.items[i].foodItem.qty
      })
    }

    console.log(this.form)
    this.selectedCategory = this.singlePlatterItem.menuCategory
    this.foodType = this.allType.MenuTypes
    this.selectedFoodType = this.singlePlatterItem.foodType
    this.selectedFoodSubType = this.singlePlatterItem.foodSubType
    const typeIndex = this.foodType.findIndex(foodType => foodType.id === this.selectedFoodType.id)
    this.foodSubType = this.foodType[typeIndex].subTypes

    this.form.foodType = this.selectedFoodType.id
    this.form.foodSubType = this.selectedFoodSubType.id
    // this.form.items = this.singlePlatterItem.items
    this.loading = false
  },
  methods: {
    ...mapActions('category', ['requestSingleRestaurantMenuCategory']),
    ...mapActions('platter', ['requestGetSinglePlatterItem']),
    ...mapActions('type', ['requestGetAllTypes']),
    ...mapActions('platter', ['requestEditPlatterItem']),
    handleVarientChecker () {
      console.log(this.hasVariantTracker)
      this.hasVariantTracker = !this.hasVariantTracker
      console.log(this.hasVariantTracker)
    },
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
        this.form.foodSubType = this.selectedFoodSubType.id
      }
    },
    changeSubType (value) {
      this.form.foodSubType = value
    },
    updateImageUrl (url) {
      this.form.image = url
    },
    addVariant () {
      this.variants.forEach(data => delete data.__typename)
      this.variants.push({
        variantName: '',
        price: 0
      })
      // console.log(this.variants)
    },
    removeVariant (index) {
      this.variants.splice(index, 1)
    },
    async submitForm () {
      console.log(this.form)
      if (this.form.image === '') {
        this.$notifier.showMessage({
          content: 'image is required',
          color: 'error'
        })
        return
      }
      if (this.$refs.form.validate()) {
        this.loading = true
        // this.form.menuCategory = this.selectedCategory
        this.form.price = parseFloat(this.form.price)
        this.form.discount = parseFloat(this.form.discount)
        this.form.restaurant = this.restaurantId
        this.form.menuCategory = this.selectedCategory.id
        this.form.variant = this.variants
        delete this.form.id
        delete this.form.updatedAt
        delete this.form.createdAt
        delete this.form.__typename
        delete this.form.code
        delete this.form.msg

        for (let i = 0; i < this.selectedFoodItems.length; i++) {
          this.form.items.push({
            foodItem: this.selectedFoodItems[i].id,
            qty: parseInt(this.selectedFoodItems[i].qty)
          })
        }

        const res = await this.requestEditPlatterItem({
          $apollo: this.$apollo,
          payload: {
            payload: this.form,
            platterItemId: this.singlePlatterItem.id
          },
          jwt: this.jwt
        })
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
        console.log('Edited==============>', res.code)
        if (res.code === API.SUCCESS) {
          await this.$router.push('/menu/platter')
        }
      } else {
        this.$notifier.showMessage({
          content: 'Invalid input',
          color: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>

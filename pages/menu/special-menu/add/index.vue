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
        <label class="ml-3">Description </label>
        <v-textarea
          v-model="form.detailsInfo"
          class="mt-2"
          placeholder="Details Info"
          dense
          filled
        />
        <label>Enable Days In Week</label>
        <v-row>
          <v-col
            v-for="day in weekdays"
            :key="day.name"
            cols="2"
            md2
            sm4
            align-self="center"
          >
            <v-card class="align-center text-align-center" :color="form.enableDayInWeek.includes(day.value) ? 'primary':null" @click="selectedDay(day)">
              <v-card-title primary-title class="justify-center">
                {{ day.name }}
              </v-card-title>
            </v-card>
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
          <v-btn class="white--text primary" rounded @click="submitSpecialMenu">
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
  name: 'AddSpecialItem',
  data () {
    return {
      loading: false,
      filterInput: {
        // searchParam: '',
        status: MENU_CATEGORY_STATUS.ACTIVE
      },
      weekdays: [
        {
          name: 'Sunday',
          value: 0
        },
        {
          name: 'Monday',
          value: 1
        },
        {
          name: 'Tuesday',
          value: 2
        },
        {
          name: 'Wednesday',
          value: 3
        },
        {
          name: 'Thursday',
          value: 4
        },
        {
          name: 'Friday',
          value: 5
        },
        {
          name: 'Saturday',
          value: 6
        }
      ],
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
        manufactureDate: '',
        hasVariant: false,
        variant: [],
        expiryDate: '',
        enableDayInWeek: [],
        discount: 0,
        serveTime: ''
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
    ...mapGetters('auth', ['jwt', 'restaurantId'])
  },
  watch: {
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
  methods: {
    ...mapActions('specialMenu', ['requestCreateSpecialMenu']),
    selectedDay (day) {
      if (!this.form.enableDayInWeek.includes(day.value)) {
        this.form.enableDayInWeek.push(day.value)
      } else {
        console.log(day.value)
        this.form.enableDayInWeek = this.form.enableDayInWeek.filter(enableDay => enableDay !== day.value)
      }
      console.log(this.form.enableDayInWeek)
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
    async submitSpecialMenu () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.price = parseFloat(this.form.price)
        this.form.discount = parseFloat(this.form.discount)
        this.form.restaurant = this.restaurantId

        const res = await this.requestCreateSpecialMenu({
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
          await this.$router.push('/menu/special-menu')
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

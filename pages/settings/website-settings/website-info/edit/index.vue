<template>
  <div>
    <v-card elevation="10">
      <v-card-title>
        <v-icon class="pr-2">
          mdi-square-edit-outline
        </v-icon>
        Update Website Info
      </v-card-title>
      <v-divider />
      <v-form ref="form" class="pa-8">
        <v-row>
          <v-col>
            <label>Restaurant Logo:</label>
            <ImageInput class="mb-10 mt-5 text-left" :image-link="form.logo" @changeImagelink="updateImageUrl($event)" />
          </v-col>
          <v-col>
            <label>Website Favicon:</label>
            <ImageInput class="mb-10 mt-5 text-left" :image-link="form.favicon" @changeImagelink="updateFavicon($event)" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mx-5 my-8">
              <div class="caption my-2">
                Business Type:
              </div>

              <v-select
                v-model="form.businessType"
                :items="businessTypes"
                :rules="businessTypeRules"
                class="mt-2"
                filled
                rounded
                dense
              />
            </div>
          </v-col>
          <v-col>
            <div class="mx-5 my-8">
              <div class="caption my-2">
                Dish / Restaurant Type:
              </div>
              <v-select
                v-model="form.restaurantType"
                :items="restaurantTypes"
                :rules="restaurantTypeRules"
                multiple
                chips
                dense
                class="mt-2"
                filled
                rounded
              />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label class="ml-3">Primary Color: </label>
            <v-color-picker
              v-model="form.primaryColor"
              dot-size="15"
              swatches-max-height="100"
            />
          </v-col>
          <v-col>
            <label class="ml-3">Website Secondary Color: </label>
            <v-color-picker
              v-model="form.secondaryColor"
              dot-size="15"
              swatches-max-height="100"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="form.vat"
              class="mt-2"
              filled
              dense
              rounded
              placeholder="Vat"
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="form.servicecharge"
              class="mt-2"
              filled
              dense
              rounded
              placeholder="Service charge"
            />
          </v-col>
        </v-row>

        <label class="ml-3">Restaurant Name: </label>
        <v-text-field
          v-model="form.name"
          class="mt-2"
          filled
          dense
          rounded
          :rules="nameRules"
          placeholder="Restaurant Name"
        />

        <label class="ml-3">Restaurant Motto/Slogan: </label>
        <v-text-field
          v-model="form.slogan"
          class="mt-2"
          :rules="sloganRules"
          filled
          dense
          rounded
          placeholder="Restaurant Motto/Slogan"
        />
        <label class="ml-3">About Restaurant: </label>
        <v-textarea
          v-model="form.aboutUs"
          class="mt-2"
          :rules="aboutUsRules"
          filled
          dense
          rounded
          placeholder="About your Restaurant"
        />
        <v-row>
          <v-col>
            <span class="caption">Restaurant Floors</span>
            <v-divider />
          </v-col>
        </v-row>
        <div class="text-center pt-4">
          <v-btn color="primary" small rounded @click="$nuxt.$emit('toggleFloorDialog', true)">
            Add Floor
          </v-btn>
        </div>
        <v-row>
          <v-col>
            <span class="caption">Restaurant Address</span>
            <v-divider />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label class="ml-3">Country</label>
            <v-text-field
              v-model="form.address.country"
              class="mt-2"
              :rules="addressCountryRules"
              filled
              dense
              rounded
              placeholder="Country"
            />
          </v-col>
          <v-col>
            <label class="ml-3">City</label>
            <v-text-field
              v-model="form.address.city"
              class="mt-2"
              :rules="addressCityRules"
              filled
              dense
              rounded
              placeholder="City"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <label class="ml-3">Street</label>
            <v-text-field
              v-model="form.address.street"
              class="mt-2"
              :rules="addressStreetRules"
              filled
              dense
              rounded
              placeholder="Street"
            />
          </v-col>
          <v-col>
            <label class="ml-3">Area</label>
            <v-text-field
              v-model="form.address.area"
              class="mt-2"
              :rules="addressAreaRules"
              filled
              dense
              rounded
              placeholder="Area"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label class="ml-3">Zip Code</label>
            <v-text-field
              v-model="form.address.zip_code"
              class="mt-2"
              :rules="addressZipCodeRules"
              filled
              dense
              rounded
              placeholder="Zip Code"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <span class="caption">Emails</span>
            <v-divider />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="(email,index) in form.email" :key="index" cols="6" class="py-0 mt-2">
            <label class="ml-3">Restaurant Email ({{ index + 1 }})</label>
            <v-btn
              v-if="index !== 0"
              x-small
              outlined
              color="error"
              class="text-right"
              @click="removeEmail(index)"
            >
              Remove
            </v-btn>
            <v-text-field
              v-model="form.email[index]"
              class="mt-2"
              :rules="emailRules"
              filled
              dense
              rounded
              placeholder="Restaurant Email"
            />
          </v-col>
        </v-row>
        <div v-if="form.email.length < 4" class="ml-3 pb-10 mt-4">
          <v-btn small rounded color="primary" class="mr-3" @click="addEmail()">
            <v-icon small>
              mdi-plus
            </v-icon>
            Add Email
          </v-btn>
        </div>

        <v-row>
          <v-col>
            <span class="caption">Phone Numbers</span>
            <v-divider />
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="(phone,index) in form.phoneNo" :key="index" cols="6" class="py-0">
            <label class="ml-3">Restaurant Phone Number ({{ index + 1 }})</label>
            <v-btn
              v-if="index !== 0"
              x-small
              outlined
              color="error"
              class="text-right"
              @click="removePhoneNo(index)"
            >
              Remove
            </v-btn>
            <v-text-field
              v-model="form.phoneNo[index]"
              class="mt-2"
              :rules="phoneNoRules"
              filled
              dense
              rounded
              placeholder="Restaurant Phone Number"
            />
          </v-col>
        </v-row>
        <div v-if="form.phoneNo.length < 4" class="ml-3 pb-10 mt-4">
          <v-btn small rounded color="primary" class="mr-3" @click="addPhoneNo()">
            <v-icon small>
              mdi-plus
            </v-icon>
            Add Phone Number
          </v-btn>
        </div>

        <v-row>
          <v-col class="mr-2">
            <v-row>
              <v-col>
                <span class="caption">Opening Times</span>
                <v-divider />
              </v-col>
            </v-row>
            <v-row v-for="(open, index) in form.opening" :key="index">
              <v-col class="py-0">
                <span class="pl-6">{{ open.day }}</span>
                <v-text-field
                  v-model="open.time"
                  class="mt-2"
                  :rules="openingRules"
                  filled
                  dense
                  rounded
                  hint="Example: 09:00am"
                  :placeholder="`${open.day} Opening Time`"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col class="ml-2">
            <v-row>
              <v-col>
                <span class="caption">Closing Times</span>
                <v-divider />
              </v-col>
            </v-row>
            <v-row v-for="(close, index) in form.closing" :key="index">
              <v-col class="py-0">
                <span class="pl-6">{{ close.day }}</span>
                <v-text-field
                  v-model="close.time"
                  class="mt-2"
                  :rules="closingRules"
                  filled
                  dense
                  rounded
                  hint="Example: 20:00pm"
                  :placeholder="`${close.day} Closing Time`"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <label class="ml-3">Legal Notice:</label>
        <v-textarea
          v-model="form.legalNotice"
          :rules="legalNoticeRules"
          class="mt-3 ml-3"
          dense
          filled
          rounded
          placeholder="Legal Notice"
        />
        <div class="text-center">
          <v-btn :loading="isLoading" class="primary white--text px-10" rounded @click="editRestaurantInfo()">
            Update
          </v-btn>
        </div>
      </v-form>
    </v-card>
    <AddFloorComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BUSINESS_TYPES, RESTAURANT_TYPES, TOAST } from '~/utils/strings'
import AddFloorComponent from '~/components/dialogs/AddFloorComponent'

export default {
  name: 'PageEditWebsiteInfo',
  components: { AddFloorComponent },
  data () {
    return {
      isLoading: false,
      restaurantId: '',
      businessTypes: BUSINESS_TYPES,
      restaurantTypes: RESTAURANT_TYPES,
      form: {
        ownedPackage: '',
        name: '',
        logo: '',
        favicon: '',
        thumbnail: '',
        primaryColor: '',
        secondaryColor: '',
        totalFloorData: [],
        fonts: '',
        slider: [],
        gallery: [],
        address: {
          street: '',
          city: '',
          zip_code: '',
          area: '',
          country: ''
        },
        location: {},
        slogan: '',
        socialLink: [{
          socialSite: '',
          link: ''
        }],
        phoneNo: [''],
        email: [''],
        description: [],
        aboutUs: '',
        opening: [
          {
            day: 'Monday',
            time: ''
          },
          {
            day: 'Tuesday',
            time: ''
          },
          {
            day: 'Wednesday',
            time: ''
          },
          {
            day: 'Thursday',
            time: ''
          },
          {
            day: 'Friday',
            time: ''
          },
          {
            day: 'Saturday',
            time: ''
          },
          {
            day: 'Sunday',
            time: ''
          }
        ],
        closing: [
          {
            day: 'Monday',
            time: ''
          },
          {
            day: 'Tuesday',
            time: ''
          },
          {
            day: 'Wednesday',
            time: ''
          },
          {
            day: 'Thursday',
            time: ''
          },
          {
            day: 'Friday',
            time: ''
          },
          {
            day: 'Saturday',
            time: ''
          },
          {
            day: 'Sunday',
            time: ''
          }
        ],
        legalNotice: ''
        // orderFromOutside: false,
        // ordersWith: []
      },
      requiredRules: [v => !!v || 'The field is required'],
      businessTypeRules: [v => !!v || 'Business type is required'],
      restaurantTypeRules: [v => !!v || 'Restaurant type is required'],
      nameRules: [v => !!v || 'Restaurant Name is required'],
      logoRules: [v => !!v || 'Restaurant Logo is required'],
      faviconRules: [v => !!v || 'Website Favicon is required'],
      thumbnailRules: [v => !!v || 'Thumbnail is required'],
      // primaryColorRules: [v => !!v || 'Primary color for website is required'],
      // secondaryColorRules: [v => !!v || 'Secondary color for website is required'],
      // fontsRules: [v => !!v || 'Font is required'],
      // sliderRules: [],
      // galleryRules: [],
      addressCountryRules: [v => !!v || 'Country is required'],
      addressCityRules: [v => !!v || 'City is required'],
      addressStreetRules: [v => !!v || 'Street is required'],
      addressAreaRules: [v => !!v || 'Area is required'],
      addressZipCodeRules: [v => !!v || 'Zip Code is required'],
      sloganRules: [v => !!v || 'Restaurant motto/slogan is required'],
      floorRules: [v => !!v || 'Restaurant Total Floor is required'],
      socialLinkRules: [v => !!v || 'Social Link is required'],
      phoneNoRules: [
        v => !!v || 'Phone number is required',
        v => /(?=.*\d)/.test(v) || 'Phone number must contain number only',
        v => v.length === 14 || 'The phone number must be 14 digit long with country code.'
      ],
      descriptionRules: [v => !!v || 'Website description is required'],
      aboutUsRules: [v => !!v || 'About Restaurant is required'],
      openingRules: [v => !!v || 'Opening time is required'],
      closingRules: [v => !!v || 'Closing time is required'],
      legalNoticeRules: [v => !!v || 'Legal notice is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    ...mapGetters('restaurant', ['singleRestaurant']),
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('restaurant', ['singleRestaurant', 'restaurantUniqueName'])
  },
  async created () {
    await this.requestGetSingleRestaurant({
      $apollo: this.$apollo,
      uniqueName: this.restaurantUniqueName,
      jwt: this.jwt,
      isForSettings: true
    })
    this.restaurantId = this.singleRestaurant._id
    this.form =
      {
        ...this.singleRestaurant
      }
    console.log('TableData================> ', this.singleRestaurant)
    this.$nuxt.$on('addFloor', async (item) => {
      console.log('TableData================> ', this.form.totalFloorData)
      delete item.__typename
      if (this.form.totalFloorData !== undefined) {
        await this.setTotalFloor(item)
        this.form.totalFloorData = this.singleRestaurant.totalFloorData
      } else {
        this.form.totalFloorData = item
      }
      console.log('Final Data=========>', this.form)
    })
    delete this.form._id
    delete this.form.createdAt
    delete this.form.updatedAt
    delete this.form.msg
    delete this.form.code
    delete this.form.__typename
    delete this.form.location.__typename
    delete this.form.address.__typename

    if (this.form.businessType === null) {
      delete this.form.businessType
    }
    if (this.form.restaurantType === null) {
      delete this.form.restaurantType
    }
    if (this.form.location.type === null) {
      delete this.form.location
    }

    this.form.socialLink.forEach((social) => {
      delete social.__typename
    })

    this.form.opening.forEach((opening) => {
      delete opening.__typename
    })

    this.form.closing.forEach((closing) => {
      delete closing.__typename
    })
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant', 'requestEditRestaurant', 'setTotalFloor']),
    updateImageUrl (url) {
      this.form.logo = url
    },
    updateFavicon (url) {
      this.form.favicon = url
    },
    addEmail () {
      this.form.email.push('')
    },
    removeEmail (index) {
      this.form.email.splice(index, 1)
    },
    addPhoneNo () {
      this.form.phoneNo.push('')
    },
    removePhoneNo (index) {
      this.form.phoneNo.splice(index, 1)
    },
    addSocialLink () {
      this.form.socialLink.push({
        socialSite: '',
        link: ''
      })
    },
    removeSocialLink (index) {
      this.form.socialLink.splice(index, 1)
    },
    async editRestaurantInfo () {
      if (this.form.logo === '') {
        this.$notifier.showMessage({
          content: TOAST.IMAGE_IS_REQUIRED,
          color: 'error'
        })
      }
      if (this.$refs.form.validate() && this.form.logo !== '') {
        this.isLoading = true
        console.log(this.form)
        const res = await this.requestEditRestaurant({
          $apollo: this.$apollo,
          payload: this.form,
          restaurantId: this.restaurantId,
          jwt: this.jwt
        })
        this.isLoading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })

        if (res.code === 'success') {
          await this.$router.push('/settings/website-settings/website-info')
        }
      } else {
        console.log('Not valid')
        this.$notifier.showMessage({
          content: TOAST.PLEASE_INPUT_ALL_REQUIRED_INPUT,
          color: 'error'
        })
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-weight: bold;
  padding-top: 10px;
}
</style>

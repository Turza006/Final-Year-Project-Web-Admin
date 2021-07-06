<template>
  <div>
    <v-card elevation="10" class="pb-2">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-web-box
        </v-icon>
        Website Info
        <v-spacer />
        <div>
          <v-btn small rounded class="primary white--text" to="/settings/website-settings/website-info/edit">
            <v-icon small class="pr-2">
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider />
      <v-row>
        <v-col>
          <div class="mx-5 my-8">
            <v-row>
              <v-col>
                <div class="caption my-2">
                  Restaurant Logo:
                </div>
                <v-avatar rounded size="128">
                  <v-img :src="imgBaseUrl + singleRestaurant.logo" />
                </v-avatar>
              </v-col>
              <v-col>
                <div class="caption my-2">
                  Restaurant Favicon:
                </div>
                <v-avatar rounded size="128">
                  <v-img :src="imgBaseUrl + singleRestaurant.favicon" />
                </v-avatar>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <div class="mx-5 my-8">
            <div class="caption my-2">
              Business Type:
            </div>
            {{ singleRestaurant.businessType }}
          </div>
        </v-col>
        <v-col>
          <div class="mx-5 my-8">
            <div class="caption my-2">
              Restaurant Type:
            </div>
            <v-chip v-for="(restaurantType, index) in singleRestaurant.restaurantType" :key="index" class="mr-1">
              {{ restaurantType }}
            </v-chip>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="mx-5 my-8">
            <div class="caption my-2">
              Restaurant Name:
            </div>
            {{ singleRestaurant.name }}
          </div>
        </v-col>
        <v-col>
          <div class="mx-5 my-8">
            <div class="caption my-2">
              Restaurant Unique name:
            </div>
            {{ singleRestaurant.uniqueName }}
          </div>
        </v-col>
        <v-col>
          <div class="mx-5 my-8">
            <div class="caption my-2">
              Restaurant Motto/Slogan:
            </div>
            {{ singleRestaurant.slogan }}
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-10 pt-0">
          <span class="caption">Primary color</span>
          <v-divider class="mb-5" />
          <v-color-picker hide-inputs hide-sliders disabled hide-mode-switch :value="singleRestaurant.primaryColor" />
        </v-col>
        <v-col class="pa-10 pt-0">
          <span class="caption">Secondary color</span>
          <v-divider class="mb-5" />
          <v-color-picker hide-inputs hide-sliders disabled hide-mode-switch :value="singleRestaurant.secondaryColor" />
        </v-col>
      </v-row>

      <div class="mx-5 mb-8">
        <div class="caption my-2">
          About Restaurant
          <v-divider />
        </div>
        {{ singleRestaurant.aboutUs }}
      </div>

      <div class="mx-5 my-8">
        <div class="caption my-2">
          Restaurant Address:
          <v-divider />
        </div>
        <v-row>
          <v-col>
            <span class="ml-3 caption">Country:</span>
            {{ singleRestaurant.address.country }}
          </v-col>
          <v-col>
            <span class="ml-3 caption">City:</span>
            {{ singleRestaurant.address.city }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="ml-3 caption">Street:</span>
            {{ singleRestaurant.address.street }}
          </v-col>
          <v-col>
            <span class="ml-3 caption">Area:</span>
            {{ singleRestaurant.address.area }}
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <span class="ml-3 caption">Zip Code:</span>
            {{ singleRestaurant.address.zip_code }}
          </v-col>
        </v-row>
      </div>

      <div class="mx-5 my-8">
        <div class="caption my-2" />
        <v-row>
          <v-col>
            <span class="caption">Emails</span>
            <v-divider />
            <div v-for="(email,index) in singleRestaurant.email" :key="index" class="py-0 mt-2">
              {{ email }}
              <span v-if="index !== 0">, </span>
            </div>
          </v-col>
          <v-col>
            <span class="caption">Phone Numbers</span>
            <v-divider />
            <div v-for="(phone,index) in singleRestaurant.phoneNo" :key="index" class="py-0 mt-2">
              {{ phone }}
              <span v-if="index !== 0">, </span>
            </div>
          </v-col>
        </v-row>
      </div>
      <div class="mx-5 my-8">
        <div class="caption my-2" />
        <v-row>
          <v-col>
            <span class="caption">Floors</span>
            <v-divider />
            <v-row v-if="singleRestaurant.totalFloorData">
              <v-col v-for="(floor, index) in singleRestaurant.totalFloorData" :key="index">
                <v-card
                  class="mx-auto mt-6"
                  max-width="344"
                >
                  <v-img
                    :src="floor.image"
                    height="200px"
                  />

                  <v-card-title>
                    {{ floor.floorNo }}
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>

      <div class="mx-5 my-8">
        <div class="caption my-2">
          <v-row>
            <v-col class="ma-2">
              <v-row>
                <v-col>
                  <span class="caption">Opening Times</span>
                  <v-divider />
                </v-col>
                +
              </v-row>
              <div v-for="(open, i) in singleRestaurant.opening" :key="i" class="body-1 my-3">
                <span class="pl-6 pr-1">{{ open.day }}:</span>
                {{ open.time }}
              </div>
            </v-col>
            <v-col class="ml-2">
              <v-row>
                <v-col>
                  <span class="caption">Closing Times</span>
                </v-col>
              </v-row>
              <div v-for="(close, i2) in singleRestaurant.closing" :key="i2" class="body-1 my-3">
                <span class="pl-6 pr-1">{{ close.day }}:</span>
                {{ close.time }}
              </div>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class="mx-5 my-8">
        <div class="caption my-2">
          Legal Notice
          <v-divider />
        </div>
        {{ singleRestaurant.legalNotice ? singleRestaurant.legalNotice : 'Not Added' }}
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PageWebsiteInfo',
  data () {
    return {
      isLoading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt']),
    ...mapGetters('restaurant', ['singleRestaurant'])
  },
  async created () {
    if (this.singleRestaurant.uniqueName !== null) {
      this.isLoading = true
      await this.requestGetSingleRestaurant({
        $apollo: this.$apollo,
        uniqueName: this.singleRestaurant.uniqueName,
        jwt: this.jwt
      })
      console.log(this.singleRestaurant)
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant'])
  }
}
</script>

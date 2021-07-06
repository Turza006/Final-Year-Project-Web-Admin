<template>
  <v-data-table
    :headers="headers"
    :items="singleRestaurantSlider"
    :loading="loading"
    class="grey lighten-4"
  >
    <template #[`item.image`]="{ item }">
      <div>
        <v-avatar class="my-2" size="96" rounded>
          <img
            v-if="item.image !== null"
            :src="imgBaseUrl + item.image"
            :alt="item.image"
          >
          <v-icon v-else>
            mdi-table
          </v-icon>
        </v-avatar>
      </div>
    </template>
    <template #[`item.status`]="{ item }">
      <v-chip
        color="green"
        dark
        small
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template #[`item.actions`]="{ item, index }">
      <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditSliderDialog, {item, index})">
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn class="ma-1" small outlined color="error" @click="deleteSliderItem(index)">
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Delete
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import { TOAST } from '~/utils/strings'

export default {
  name: 'SliderDatatableComponent',
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleEditSliderDialog: DIALOG_EVENT.TOGGLE_EDIT_SLIDER_DIALOG,
      loading: false,
      headers: [
        {
          text: 'Image',
          value: 'image'
        },
        {
          text: 'Slider No',
          value: 'sliderNo'
        },
        {
          text: 'Slider Text',
          value: 'text'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('restaurant', ['singleRestaurantSlider']),
    ...mapGetters('restaurant', ['restaurantUniqueName'])
  },
  created () {
    this.$nuxt.$on(API_CALL_EVENT.REQUEST_SHOW_SINGLE_RESTAURANT_NETWORK_CALL_EVENT, () => {
      this.loading = true
      this.requestGetSingleRestaurant({
        $apollo: this.$apollo,
        uniqueName: this.restaurantUniqueName,
        jwt: this.jwt
      })
      this.loading = false
    })
    this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SHOW_SINGLE_RESTAURANT_NETWORK_CALL_EVENT)
  },
  methods: {
    ...mapActions('restaurant', ['requestGetSingleRestaurant', 'requestEditRestaurant']),
    async deleteSliderItem (sliderIndex) {
      const value = await this.$confirm('Are you sure, do you really want to delete the slider?')

      if (value) {
        this.loading = true

        const slider = [...this.singleRestaurantSlider]
        slider.forEach((item) => {
          delete item.__typename
        })
        slider.splice(sliderIndex, 1)
        const res = await this.requestEditRestaurant({
          $apollo: this.$apollo,
          payload: { slider },
          restaurantId: this.restaurantId,
          jwt: this.jwt
        })
        this.loading = false

        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: TOAST.SLIDER_DELETED,
            color: 'error'
          })
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SHOW_SINGLE_RESTAURANT_NETWORK_CALL_EVENT)
        } else {
          this.$notifier.showMessage({
            content: 'Invalid input',
            color: 'error'
          })
        }
      }
    }
  }
}
</script>

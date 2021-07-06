<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Edit Slider
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <label>Slider Image *</label>
        <ImageInput class="my-4" :image-link="form.image" @changeImagelink="updateImageUrl($event)" />
        <label>Slider No *</label>
        <v-text-field
          v-model="form.sliderNo"
          type="number"
          class="mt-2"
          :rules="sliderNoRules"
          placeholder="Slider No"
          filled
          dense
          rounded
        />
        <label>Slider Text</label>
        <v-textarea
          v-model="form.text"
          type="text"
          class="mt-2"
          placeholder="Slider Text"
          filled
          dense
          rounded
        />
        <div class="text-center">
          <v-btn :loading="loading" :disabled="loading" class="primary white--text" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            Update
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import ImageInput from '~/components/ImageInput'
import { TOAST } from '~/utils/strings'

export default {
  name: 'DialogEditSlider',
  components: { ImageInput },
  data () {
    return {
      dialog: false,
      loading: false,
      sliderIndex: -1,
      form: {
        sliderNo: '',
        image: '',
        text: ''
      },
      sliderNoRules: [
        v => !!v || 'Slider No is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('restaurant', ['singleRestaurantSlider'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_EDIT_SLIDER_DIALOG, (slider) => {
      console.log('slider--->>', slider)
      this.dialog = !this.dialog
      this.sliderIndex = slider.index
      this.form.sliderNo = slider.item.sliderNo
      this.form.image = slider.item.image
      this.form.text = slider.item.text
    })
  },
  methods: {
    ...mapActions('restaurant', ['requestEditRestaurant']),
    updateImageUrl (url) {
      this.form.image = url
    },
    async submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.sliderNo = parseInt(this.form.sliderNo)
        const slider = [...this.singleRestaurantSlider]
        slider.forEach((item) => {
          delete item.__typename
        })
        slider[this.sliderIndex] = this.form
        const res = await this.requestEditRestaurant({
          $apollo: this.$apollo,
          payload: { slider },
          restaurantId: this.restaurantId,
          jwt: this.jwt
        })
        this.loading = false

        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: TOAST.SLIDER_UPDATED,
            color: res.code
          })
          this.form.image = ''
          this.form.sliderNo = ''
          this.form.text = ''
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SHOW_SINGLE_RESTAURANT_NETWORK_CALL_EVENT)
          this.dialog = false
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
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

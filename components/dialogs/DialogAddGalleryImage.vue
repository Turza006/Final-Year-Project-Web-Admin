<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
      <v-card-title>
        Add Gallery Image
      </v-card-title>
      <v-divider />
      <v-form ref="form" class="pa-10">
        <v-layout>
          <v-flex xs12 md6 sm6>
            <label class="ml-3">Image</label>
            <ImageInput class="my-4" @changeImagelink="updateImageUrl($event)" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <label class="ml-3">Image Type*</label>

            <v-text-field
              v-model="form.type"
              :rules="typeRules"
              class="mt-2"
              placeholder="Image Type"
              dense
              filled
              rounded
            />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <label class="ml-3">Description *</label>
            <v-textarea
              v-model="form.description"
              :rules="descriptionRules"
              class="mt-2"
              placeholder="Description"
              dense
              filled
              rounded
            />
          </v-flex>
        </v-layout>

        <div class="text-center mt-5">
          <v-btn :loading="loading" class="white--text primary" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            Add Gallery Image
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
  name: 'DialogAddGalleryImage',
  components: { ImageInput },
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        description: '',
        type: '',
        image: '',
        restaurant: ''
      },
      descriptionRules: [
        v => !!v || 'Description is required'
      ],
      typeRules: [
        v => !!v || 'Type is required'
      ],
      imageRules: [
        v => !!v || 'Image is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('restaurant', ['restaurantId'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_ADD_GALLERY_DIALOG, () => {
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('gallery', ['requestAddGalleryImage']),
    updateImageUrl (url) {
      this.form.image = url
    },
    async submitForm () {
      if (this.$refs.form.validate()) {
        console.log('create table-->> valid input')
        this.loading = true
        this.form.restaurant = this.restaurantId
        const res = await this.requestAddGalleryImage({
          $apollo: this.$apollo,
          payload: this.form,
          jwt: this.jwt
        })

        this.loading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })

        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: TOAST.GALLERY_IMAGE_ADDED,
            color: res.code
          })

          this.form.image = ''
          this.form.description = ''
          this.form.type = ''
          this.$nuxt.$emit(API_CALL_EVENT.GET_ALL_GALLERY_BY_RESTAURANT_ID_NETWORK_CALL_EVENT)
          this.dialog = false
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
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

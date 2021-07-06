<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        <v-icon class="mr-2" color="white">
          mdi-link-variant-plus
        </v-icon>
        Add Third Party Service
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <v-select
          v-model="form.status"
          :items="allOrderWith.OrderWiths"
          :rules="orderSystemRules"
          class="mt-2"
          filled
          rounded
          dense
          placeholder="Choose Delivery Service"
          label="Delivery Service *"
          @keypress.enter="submitForm()"
        />

        <label>Service URL *</label>
        <v-text-field
          v-model="form.link"
          type="text"
          class="mt-2"
          :rules="linkRules"
          placeholder="Service URL"
          filled
          dense
          rounded
        />

        <div class="text-center">
          <v-btn :loading="loading" :disabled="loading" class="primary white--text" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            Add Delivery Service
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'DialogAThirdPartyDeliveryService',
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        orderSystem: '',
        link: ''
      },
      linkRules: [
        v => !!v || 'Link is required'
      ],
      orderSystemRules: [
        v => !!v || 'Order System is required'
      ]
    }
  },
  computed: {
    ...mapGetters('orderWith', ['allOrderWith'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_ADD_THIRD_PARTY_SERVICES, () => {
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('restaurant', ['requestEditRestaurant']),
    updateImageUrl (url) {
      console.log(url)
      this.form.logo = url
    },
    async submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const res = await this.requestEditRestaurant({
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
          this.form = {
            name: '',
            logo: '',
            textColour: '',
            FillColour: '',
            customColour: false
          }
          this.dialog = false
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

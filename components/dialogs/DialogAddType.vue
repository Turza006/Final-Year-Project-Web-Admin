<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Add Type
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <label>Type Name *</label>
        <v-text-field
          v-model="form.typeName"
          type="text"
          class="mt-2"
          :rules="categoryRules"
          placeholder="Type Name"
          filled
          dense
          rounded
        />
        <div class="text-center">
          <v-btn :loading="loading" :disabled="loading" class="primary white--text" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            {{ buttonText }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import { API } from '~/utils/apiStatusCode'

export default {
  name: 'DialogAddType',
  data () {
    return {
      dialog: false,
      loading: false,
      buttonText: 'Add Type',
      jwt: '',
      form: {
        typeName: '',
        restaurant: ''
      },
      typeId: '',
      categoryRules: [
        v => !!v || 'Type is required',
        v => v.length >= 2 || 'Type must be at least 2 characters or more.'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['restaurantId'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_EDIT_TYPE, (type) => {
      this.form.typeName = type.typeName
      this.typeId = type.id
      this.buttonText = 'Edit Type'
      this.dialog = !this.dialog
    })
    this.jwt = this.$store.getters['auth/jwt']
    console.log(this.jwt)
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_ADD_TYPE, () => {
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('type', ['requestCreateType', 'requestEditType']),
    async submitForm () {
      console.log(this.jwt)
      if (this.$refs.form.validate()) {
        if (!this.typeId) {
          this.loading = true
          this.form.restaurant = this.restaurantId
          const res = await this.requestCreateType({
            $apollo: this.$apollo,
            payload: this.form,
            jwt: this.jwt
          })
          this.loading = false
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
          if (res.code === API.SUCCESS) {
            this.dialog = false
            this.form.category = ''
            this.form.priority = 1
            this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_TYPE_NETWORK_CALL_EVENT)
          }
        } else {
          this.loading = true
          this.form.restaurant = this.restaurantId
          const res = await this.requestEditType({
            $apollo: this.$apollo,
            payload: {
              payload: this.form,
              typeId: this.typeId
            },
            jwt: this.jwt
          })
          this.loading = false
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
          if (res.code === API.SUCCESS) {
            this.typeId = ''
            this.form = {
              typeName: '',
              status: ''
            }
            this.dialog = false
          }
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

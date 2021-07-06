<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Add Sub Type
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <v-text-field
          v-model="form.subTypeName"
          type="text"
          class="mt-2"
          placeholder="Sub Type Name"
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
  name: 'DialogSubTypeComponent',
  data () {
    return {
      dialog: false,
      loading: false,
      buttonText: 'Add Sub Type',
      jwt: '',
      form: {
        subTypeName: '',
        restaurant: '',
        typeId: ''
      },
      subTypeId: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['restaurantId'])
  },
  created () {
    this.jwt = this.$store.getters['auth/jwt']
    console.log(this.$route.params)
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_EDIT_SUB_TYPE, (type) => {
      this.form.subTypeName = type.subTypeName
      this.subTypeId = type.id
      this.form.typeId = type.typeId
      this.buttonText = 'Edit Sub Type'
      this.dialog = !this.dialog
    })
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_ADD_SUB_TYPE, (subType) => {
      this.form.typeId = subType.id
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('type', ['requestCreateSubType', 'requestEditSubType']),
    async submitForm () {
      if (this.$refs.form.validate()) {
        if (!this.subTypeId) {
          this.loading = true
          this.form.restaurant = this.restaurantId
          const res = await this.requestCreateSubType({
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
          const res = await this.requestEditSubType({
            $apollo: this.$apollo,
            payload: {
              payload: this.form,
              subTypeId: this.subTypeId
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
            this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_TYPE_NETWORK_CALL_EVENT)
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

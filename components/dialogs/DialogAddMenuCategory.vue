<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card :loading="loading" flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Add Category
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <label>Category Name *</label>
        <v-text-field
          v-model="form.category"
          type="text"
          class="mt-2"
          :rules="categoryRules"
          placeholder="Category Name"
          filled
          dense
          rounded
        />
        <label>Priority *</label>
        <v-text-field
          v-model="form.priority"
          type="number"
          class="mt-2"
          :rules="priorityRules"
          placeholder="Category Name"
          filled
          dense
          rounded
        />
        <div class="text-center">
          <v-btn :loading="loading" :disabled="loading" class="primary white--text" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            Add Category
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'DialogAddCategory',
  data () {
    return {
      dialog: false,
      loading: false,
      form: {
        category: '',
        priority: 1,
        restaurant: ''
      },
      categoryRules: [
        v => !!v || 'Category is required',
        v => v.length >= 2 || 'Category must be at least 2 characters or more.'
      ],
      priorityRules: [
        v => !!v || 'Priority is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_ADD_MENU_CATEGORY, () => {
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('category', ['requestCreateMenuCategory']),
    async submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.restaurant = this.restaurantId
        this.form.priority = parseInt(this.form.priority)
        const res = await this.requestCreateMenuCategory({
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
          this.dialog = false
          this.form.category = ''
          this.form.priority = 1
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_MENU_CATEGORY_NETWORK_CALL_EVENT)
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

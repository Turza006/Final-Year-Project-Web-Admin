<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="400"
  >
    <v-card flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Edit Category
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
          placeholder="Priority"
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
import { DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'DialogEditMenuCategory',
  data () {
    return {
      dialog: false,
      loading: false,
      menuCategoryId: '',
      form: {
        category: '',
        priority: 1,
        status: ''
      },
      statusList: ['ACTIVE', 'UNPUBLISHED'],
      categoryRules: [
        v => !!v || 'Category is required',
        v => v.length >= 2 || 'Category must be at least 2 characters or more.'
      ],
      priorityRules: [
        v => !!v || 'Priority is required'
      ],
      statusRules: [
        v => !!v || 'Status is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['restaurantId'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_EDIT_MENU_CATEGORY, (menuCategory) => {
      console.log('EDIT_SERVICE_CATEGORY--->', menuCategory)
      this.menuCategoryId = menuCategory.id
      this.form.category = menuCategory.category
      this.form.priority = menuCategory.priority
      this.form.status = menuCategory.status
      this.dialog = !this.dialog
    })
  },
  methods: {
    ...mapActions('category', ['requestEditMenuCategory']),
    async submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.restaurant = this.restaurantId
        this.form.priority = parseInt(this.form.priority)
        const res = await this.requestEditMenuCategory({
          $apollo: this.$apollo,
          payload: this.form,
          menuCategoryId: this.menuCategoryId,
          jwt: this.$store.state.auth.jwt
        })
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
        if (res.code === 'success') {
          this.menuCategoryId = ''
          this.form = {
            category: '',
            priority: '',
            status: ''
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

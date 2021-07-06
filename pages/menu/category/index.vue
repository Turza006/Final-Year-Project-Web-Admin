<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Category List
        <v-spacer />
        <v-btn class="primary" rounded small @click="$nuxt.$emit(toggleAddFoodCategoryDialog)">
          <v-icon small>
            mdi-plus
          </v-icon>
          Add Category
        </v-btn>
      </v-card-title>
      <v-divider />
      <div class="pa-8">
        <v-data-table
          :headers="headers"
          :items="allCategory.MenuCategories"
          :loading="loading"
          :options.sync="options"
          :server-items-length="allCategory.count"
          class="grey lighten-4"
        >
          <template #[`item.status`]="{ item }">
            <v-chip
              color="green"
              dark
              small
            >
              {{ item.status }}
            </v-chip>
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditFoodCategoryDialog, item)">
              <v-icon small class="mr-1">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn class="ma-1" small outlined color="error" @click="deleteCategory(item)">
              <v-icon small class="mr-1">
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <DialogAddCategory />
    <DialogEditMenuCategory />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DateConverterMixin from '~/mixins/DateConverterMixin'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import DialogAddCategory from '~/components/dialogs/DialogAddMenuCategory'
import DialogEditMenuCategory from '~/components/dialogs/DialogEditMenuCategory'
import { MENU_CATEGORY_STATUS } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'

export default {
  name: 'ServiceCategoryPage',
  components: {
    DialogEditMenuCategory,
    DialogAddCategory
  },
  mixins: [DateConverterMixin],
  data () {
    return {
      loading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleAddFoodCategoryDialog: DIALOG_EVENT.TOGGLE_ADD_MENU_CATEGORY,
      toggleEditFoodCategoryDialog: DIALOG_EVENT.TOGGLE_EDIT_MENU_CATEGORY,
      selectedStatus: MENU_CATEGORY_STATUS.ACTIVE,
      offset: 0,
      limit: 10,
      headers: [
        {
          text: 'Category Name  ',
          value: 'category'
        },
        {
          text: 'Priority',
          value: 'priority'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Actions  ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 5,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  computed: {
    ...mapGetters('category', ['allCategory']),
    ...mapGetters('auth', ['jwt', 'restaurantId'])
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.getAllCategoryNetworkCall()
      }
    }
  },
  async created () {
    await this.getAllCategoryNetworkCall()
    this.$nuxt.$on(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_MENU_CATEGORY_NETWORK_CALL_EVENT, async () => {
      await this.getAllCategoryNetworkCall()
    })
  },
  methods: {
    ...mapActions('category', ['requestSingleRestaurantMenuCategory', 'requestDeleteMenuCategory']),
    async deleteCategory (item) {
      const value = await this.$confirm('Are you sure, do you really want to delete the menu category?<br><br>Category Name: ' + item.category + '<br>Priority: ' + item.priority)

      if (value) {
        this.loading = true

        const res = await this.requestDeleteMenuCategory({
          $apollo: this.$apollo,
          menuCategoryId: item.id,
          restaurant: this.restaurantId,
          jwt: this.jwt
        })
        this.loading = false
        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: TOAST.MENU_CATEGORY_DELETED,
            color: 'success'
          })
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
        }
      }
    },
    async getAllCategoryNetworkCall () {
      this.loading = true
      await this.requestSingleRestaurantMenuCategory({
        $apollo: this.$apollo,
        restaurantId: this.restaurantId,
        status: this.selectedStatus,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>

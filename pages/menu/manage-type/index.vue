<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Type List
        <v-spacer />
        <v-btn class="primary" rounded small @click="$nuxt.$emit(toggleAddTypeDialog)">
          <v-icon small>
            mdi-plus
          </v-icon>
          Add Type
        </v-btn>
      </v-card-title>
      <v-divider />
      <div class="pa-8">
        <v-data-table
          :headers="headers"
          :items="allType.MenuTypes"
          :loading="loading"
          :options.sync="options"
          :server-items-length="allType.count"
          :expanded="expanded"
          item-key="id"
          show-expand
          class="grey lighten-4"
        >
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-0 ma-0">
              <v-data-table
                :headers="subHeaders"
                class="grey lighten-4"
                :items="item.subTypes"
                hide-default-footer
              >
                <template #[`item.actions`]="{ item }">
                  <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditSubTypeDialog, item)">
                    <v-icon small class="mr-1">
                      mdi-pencil
                    </v-icon>
                    Edit
                  </v-btn>
                  <v-btn class="ma-1" small outlined color="error" @click="deleteSubType(item)">
                    <v-icon small class="mr-1">
                      mdi-delete
                    </v-icon>
                    Delete
                  </v-btn>
                </template>
              </v-data-table>
            </td>
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

          <template #[`item.actions`]="{ item }">
            <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditTypeDialog, item)">
              <v-icon small class="mr-1">
                mdi-pencil
              </v-icon>
              Edit
            </v-btn>
            <v-btn class="ma-1" small outlined color="error" @click="deleteType(item)">
              <v-icon small class="mr-1">
                mdi-delete
              </v-icon>
              Delete
            </v-btn>
            <v-btn class="ma-1" small outlined color="success" @click="$nuxt.$emit(toggleAddSubTypeDialog, item)">
              <v-icon small class="mr-1">
                mdi-delete
              </v-icon>
              Add Sub Type
            </v-btn>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <DialogAddType :type-id="typeId" :type-name="typeName" />
    <DialogSubTypeComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DialogAddType from '~/components/dialogs/DialogAddType'
import DialogSubTypeComponent from '~/components/dialogs/DialogSubTypeComponent'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import { API, MENU_CATEGORY_STATUS } from '~/utils/apiStatusCode'
import { TOAST } from '~/utils/strings'

export default {
  name: 'Index',
  components: {
    DialogAddType,
    DialogSubTypeComponent
  },
  data () {
    return {
      expanded: ['Donut'],
      loading: false,
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleAddFoodCategoryDialog: DIALOG_EVENT.TOGGLE_ADD_MENU_CATEGORY,
      toggleAddTypeDialog: DIALOG_EVENT.TOGGLE_ADD_TYPE,
      toggleAddSubTypeDialog: DIALOG_EVENT.TOGGLE_ADD_SUB_TYPE,
      toggleEditFoodCategoryDialog: DIALOG_EVENT.TOGGLE_EDIT_MENU_CATEGORY,
      toggleEditTypeDialog: DIALOG_EVENT.TOGGLE_EDIT_TYPE,
      toggleEditSubTypeDialog: DIALOG_EVENT.TOGGLE_EDIT_SUB_TYPE,
      selectedStatus: MENU_CATEGORY_STATUS.ACTIVE,
      offset: 0,
      limit: 10,
      typeId: '',
      typeName: '',
      headers: [
        {
          text: 'Type Name  ',
          value: 'typeName'
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
      subHeaders: [
        {
          text: 'Sub Type Name  ',
          value: 'subTypeName',
          sort: false
        },
        {
          text: 'Status',
          value: 'status',
          sort: false
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
      },
      singleType: {},
      searchParam: '',
      restaurant: '',
      jwt: ''
    }
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.getAllTypeNetworkCall()
      }
    }
  },
  computed: {
    ...mapGetters('type', ['allType'])
  },
  async created () {
    await this.getAllTypeNetworkCall()
    this.$nuxt.$on(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_TYPE_NETWORK_CALL_EVENT, async () => {
      await this.getAllTypeNetworkCall()
    })
  },
  methods: {
    ...mapActions('type', ['requestGetAllTypes', 'requestDeleteType', 'requestDeleteSubType']),
    async deleteType (item) {
      const value = await this.$confirm('Are you sure, do you really want to delete the menu type?<br><br>Category Name: ' + item.typeName)

      if (value) {
        this.loading = true

        const res = await this.requestDeleteType({
          $apollo: this.$apollo,
          payload: {
            typeId: item.id
          },
          jwt: this.jwt
        })
        this.loading = false
        if (res.code === 'success') {
          this.$notifier.showMessage({
            content: TOAST.TYPE_DELETED,
            color: 'success'
          })
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_TYPE_NETWORK_CALL_EVENT)
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
        }
      }
    },
    async deleteSubType (item) {
      const value = await this.$confirm('Are you sure, do you really want to delete the menu sub type?<br><br>Sub Type Name: ' + item.subTypeName)

      if (value) {
        this.loading = true

        const res = await this.requestDeleteSubType({
          $apollo: this.$apollo,
          payload: {
            subTypeId: item.id
          },
          jwt: this.jwt
        })
        this.loading = false
        if (res.code === API.SUCCESS) {
          this.$notifier.showMessage({
            content: TOAST.SUB_TYPE_DELETED,
            color: 'success'
          })
          this.$nuxt.$emit(API_CALL_EVENT.REQUEST_SINGLE_RESTAURANT_TYPE_NETWORK_CALL_EVENT)
        } else {
          this.$notifier.showMessage({
            content: res.msg,
            color: res.code
          })
        }
      }
    },
    async getAllTypeNetworkCall () {
      this.loading = true
      this.restaurant = this.$store.getters['restaurant/restaurantId']
      this.jwt = this.$store.getters['auth/jwt']
      await this.$store.dispatch('type/requestGetAllTypes', {
        $apollo: this.$apollo,
        payload: {
          restaurant: this.restaurant,
          limit: this.options.itemsPerPage,
          offset: this.options.pageCount
        },
        jwt: this.jwt
      })
      console.log(this.$store.getters['type/allType'])
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>

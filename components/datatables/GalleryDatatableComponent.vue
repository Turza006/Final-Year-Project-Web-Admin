<template>
  <v-data-table
    :headers="headers"
    :items="allGalleryImages.Galleries"
    :options.sync="options"
    :server-items-length="allGalleryImages.Galleries.count"
    :loading="loading"
    class="grey lighten-4"
  >
    <template #[`item.image`]="{ item }">
      <div>
        <v-avatar class="my-2" size="96" rounded>
          <img
            :src="item.image ? imgBaseUrl + item.image : '/img/ic_img_upload.png'"
          >
        </v-avatar>
      </div>
    </template>
    <template #[`item.status`]="{ item }">
      <v-chip
        :color="item.status=== 'ACTIVE' ? 'green' : 'grey'"
        dark
        small
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template #[`item.actions`]="{ item, index }">
      <div v-if="item.status=== 'ACTIVE'">
        <v-btn class="ma-1" small outlined color="info" @click="$nuxt.$emit(toggleEditGalleryDialog, item)">
          <v-icon small class="mr-1">
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>
        <v-btn class="ma-1" small outlined color="error" @click="deleteGalleryImage({item, index})">
          <v-icon small class="mr-1">
            mdi-delete
          </v-icon>
          Delete
        </v-btn>
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'GalleryDatatableComponent',
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      toggleEditGalleryDialog: DIALOG_EVENT.TOGGLE_EDIT_GALLERY_DIALOG,
      loading: false,
      headers: [
        {
          text: 'Image',
          value: 'image'
        },
        {
          text: 'Description',
          value: 'description'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Status',
          value: 'status'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('gallery', ['allGalleryImages'])
  },
  watch: {
    options: {
      deep: true,
      handler () {
        this.getAllGalleryImageNetworkCall()
      }
    }
  },
  created () {
    this.$nuxt.$on(API_CALL_EVENT.GET_ALL_GALLERY_BY_RESTAURANT_ID_NETWORK_CALL_EVENT, () => {
      this.getAllGalleryImageNetworkCall()
    })
    this.getAllGalleryImageNetworkCall()
  },
  methods: {
    ...mapActions('gallery', ['requestGetAllGalleryByRestaurantId', 'requestDeleteGalleryImage']),
    async getAllGalleryImageNetworkCall () {
      this.loading = true
      await this.requestGetAllGalleryByRestaurantId({
        $apollo: this.$apollo,
        RestaurantID: this.restaurantId,
        offset: this.options.page - 1,
        limit: this.options.itemsPerPage !== -1 ? this.options.itemsPerPage : null,
        jwt: this.jwt
      })
      this.loading = false
    },
    async deleteGalleryImage ({
      item,
      index
    }) {
      const value = await this.$confirm('Are you sure, do you really want to delete the gallery image?')

      if (value) {
        this.loading = true
        const res = await this.requestDeleteGalleryImage({
          $apollo: this.$apollo,
          GalleryId: item.id,
          restaurant: this.restaurantId,
          jwt: this.jwt
        })
        this.loading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
      }
    }
  }
}
</script>

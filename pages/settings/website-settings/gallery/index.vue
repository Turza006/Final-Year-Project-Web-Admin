<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Manage Gallery
      <v-spacer />
      <v-btn class="primary white--text" small rounded @click="$nuxt.$emit(toggleAddGalleryDialog)">
        Add Gallery
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <GalleryDatatableComponent />
    </div>
    <DialogAddGalleryImage />
    <DialogEditGalleryImage />
  </v-card>
</template>

<script>
import GalleryDatatableComponent from '~/components/datatables/GalleryDatatableComponent'
import DialogEditGalleryImage from '~/components/dialogs/DialogEditGalleryImage'
import DialogAddGalleryImage from '~/components/dialogs/DialogAddGalleryImage'
import { DIALOG_EVENT } from '~/utils/events'

export default {
  name: 'PageManageGallery',
  components: {
    DialogEditGalleryImage,
    DialogAddGalleryImage,
    GalleryDatatableComponent
  },
  data () {
    return {
      toggleAddGalleryDialog: DIALOG_EVENT.TOGGLE_ADD_GALLERY_DIALOG
    }
  }
}
</script>

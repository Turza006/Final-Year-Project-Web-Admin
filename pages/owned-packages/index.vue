<template>
  <div>
    <v-card flat tile elevation="10" class="grey lighten-4">
      <v-card-title>
        Owned Packages
        <v-spacer />
      </v-card-title>
      <v-divider />
      <div class="pa-8">
        <OwnedPackageDatatableComponentComponent />
      </div>
    </v-card>
  </div>
</template>

<script>

import OwnedPackageDatatableComponentComponent from '~/components/datatables/OwnedPackageDatatableComponent'
import { DIALOG_EVENT } from '~/utils/events'
export default {
  name: 'PageOwnedPackage',
  components: { OwnedPackageDatatableComponentComponent },
  layout: 'blankLayout',
  middleware: ['authenticated'],
  data () {
    return {
      toggleAddFoodCategoryDialog: DIALOG_EVENT.TOGGLE_ADD_MENU_CATEGORY
    }
  }
}
</script>

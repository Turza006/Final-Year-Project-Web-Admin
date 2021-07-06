<template>
  <v-card flat tile elevation="10" class="grey lighten-4">
    <v-card-title>
      Website Slider
      <v-spacer />
      <v-btn class="primary white--text" small rounded @click="$nuxt.$emit(toggleAddSliderDialog)">
        Add Slider
      </v-btn>
    </v-card-title>
    <v-divider />
    <div class="pa-8">
      <SliderDatatableComponent />
    </div>
    <DialogAddSlider />
    <DialogEditSlider />
  </v-card>
</template>

<script>
import SliderDatatableComponent from '~/components/datatables/SliderDatatableComponent'
import { DIALOG_EVENT } from '~/utils/events'
import DialogAddSlider from '~/components/dialogs/DialogAddSlider'
import DialogEditSlider from '~/components/dialogs/DialogEditSlider'

export default {
  name: 'PageManageSlider',
  components: {
    DialogEditSlider,
    DialogAddSlider,
    SliderDatatableComponent
  },
  data () {
    return {
      toggleAddSliderDialog: DIALOG_EVENT.TOGGLE_ADD_SLIDER_DIALOG
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600"
  >
    <v-card tile class="my-5 grey lighten-4" elevation="10">
      <v-card-title>
        Add Floor
      </v-card-title>
      <v-divider />

      <v-container fill-height fluid>
        <v-row
          no-gutters
          justify="center"
          align-content="center"
        >
          <v-col cols="6" align-self="center" align="center" class="mb-4">
            <ImageInput class="my-4" :image-link="floorItem.image" @changeImagelink="updateImageUrl($event)" />
            <v-text-field
              v-model="floorItem.floorNo"
              filled
              dense
              rounded
              placeholder="Floor No"
            />
            <v-btn color="primary" small rounded @click="addFloor">
              Add Floor
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddFloorComponent',
  data () {
    return {
      dialog: false,
      floorItem: {
        image: '',
        floorNo: ''
      }
    }
  },

  created () {
    this.$nuxt.$on('toggleFloorDialog', (data) => {
      this.dialog = !this.dialog
      console.log('Emitted')
    })
  },
  methods: {
    addFloor () {
      this.$nuxt.$emit('addFloor', this.floorItem)
      this.dialog = false
    },
    updateImageUrl (url) {
      this.floorItem.image = url
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    transition="dialog-bottom-transition"
  >
    <v-card flat tile class="grey lighten-4" elevation="10">
      <v-card-title class="white--text primary">
        Edit Table
      </v-card-title>
      <v-form ref="form" class="pa-10">
        <v-layout>
          <v-flex xs12 md6 sm6>
            <label class="ml-3">Image</label>
            <ImageInput class="my-4" @changeImagelink="updateImageUrl($event)" />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <label class="ml-3">Table Number *</label>
            <v-text-field
              v-model="form.tableNo"
              :rules="tableNoRules"
              class="mt-2"
              placeholder="Table Number"
              dense
              filled
              rounded
            />
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <label class="ml-3">Name *</label>
            <v-text-field
              v-model="form.tableName"
              :rules="tableNameRules"
              type="text"
              class="mt-2"
              placeholder="Name"
              filled
              dense
              rounded
            />
          </v-flex>
        </v-layout>

        <v-layout>
          <v-flex>
            <label class="ml-3">Chair Quantity *</label>
            <v-text-field
              v-model="form.tableChairNo"
              :rules="tableChairNoRules"
              class="mt-2"
              placeholder="Chair Quantity on that table"
              dense
              filled
              rounded
            />
          </v-flex>
        </v-layout>

        <label>Select Floor</label>

        <v-row v-if="singleRestaurant.totalFloorData">
          <v-col v-for="(floor, index) in singleRestaurant.totalFloorData" :key="index">
            <v-card
              class="mx-auto mt-6"
              max-width="200"
              :color="form.floor.floorNo === floor.floorNo ? 'primary': ''"
              @click="selectFloor(floor)"
            >
              <v-img
                :src="floor.image"
                height="160px"
              />

              <v-card-title>
                {{ floor.floorNo }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
        <div class="text-center mt-5">
          <v-btn :loading="loading" class="white--text primary" rounded @click="submitForm()">
            <v-icon class="mr-1">
              mdi-content-save
            </v-icon>
            UPDATE
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { API_CALL_EVENT, DIALOG_EVENT } from '~/utils/events'
import ImageInput from '~/components/ImageInput'

export default {
  name: 'DialogEditTable',
  components: { ImageInput },
  data () {
    return {
      dialog: false,
      loading: false,
      tableId: '',
      form: {
        tableImg: '',
        tableNo: '',
        tableName: '',
        tableChairNo: '',
        floor: {},
        Restaurant: ''
      },
      tableImgRules: [
        v => !!v || 'Image is required'
      ],
      tableNoRules: [
        v => !!v || 'Table no is required'
      ],
      tableNameRules: [
        v => !!v || 'Table name is required'
      ],
      tableChairNoRules: [
        v => !!v || 'Chair quantity is required'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['jwt', 'restaurantId']),
    ...mapGetters('restaurant', ['singleRestaurant'])
  },
  created () {
    this.$nuxt.$on(DIALOG_EVENT.TOGGLE_EDIT_TABLE, (table) => {
      console.log('EDIT_TABLE--->', table)
      this.tableId = table.id
      this.form.tableImg = table.tableImg
      this.form.tableName = table.tableName
      this.form.tableNo = table.tableNo
      this.form.tableChairNo = table.tableChairNo
      this.form.Restaurant = table.Restaurant.id
      this.form.floor = table.floor || {}
      this.dialog = !this.dialog
      console.log('EDIT_TABLE--->', this.form)
    })
  },
  methods: {
    ...mapActions('table', ['requestEditTable']),
    selectFloor (floor) {
      this.form.floor = floor
    },
    updateImageUrl (url) {
      this.form.tableImg = url
    },
    async submitForm () {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.form.tableNo = parseInt(this.form.tableNo)
        this.form.tableChairNo = parseInt(this.form.tableChairNo)
        const res = await this.requestEditTable({
          $apollo: this.$apollo,
          payload: this.form,
          tableId: this.tableId,
          jwt: this.jwt
        })
        this.loading = false
        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })
        if (res.code === 'success') {
          this.$nuxt.$emit(API_CALL_EVENT.GET_ALL_TABLE_NETWORK_CALL_EVENT)
          this.tableId = ''
          this.form = {
            tableImg: '',
            tableNo: '',
            tableName: '',
            tableChairNo: '',
            floor: {}
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

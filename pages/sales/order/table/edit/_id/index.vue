<template>
  <v-card tile class="my-5 grey lighten-4" elevation="10" :loading="loading">
    <v-card-title>
      Edit Table
    </v-card-title>
    <v-divider />
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

      <label class="ml-3">Select Floor *</label>
      <v-layout>
        <v-row v-if="form.floor">
          <v-col v-for="(floor, index) in form.floor" :key="index">
            <v-card
              class="mx-auto mt-6"
              max-width="344"
              @click="form.floor = floor"
            >
              <v-img
                :src="floor.image"
                height="200px"
              />

              <v-card-title>
                {{ floor.floorNo }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-layout>

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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ImageInput from '~/components/ImageInput'
import { API } from '~/utils/apiStatusCode'

export default {
  name: '',
  components: { ImageInput },
  data () {
    return {
      loading: false,
      tableId: '',
      form: {
        tableImg: '',
        tableNo: '',
        tableName: '',
        floor: {},
        tableChairNo: '',
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
    ...mapGetters('auth', ['jwt', 'restaurantId'])
  },
  created () {
    this.tableId = this.$route.params.id
  },
  methods: {
    ...mapActions('table', ['requestEditTable']),
    updateImageUrl (url) {
      this.form.tableImg = url
    },
    async submitForm () {
      if (this.$refs.form.validate()) {
        console.log('create table-->> valid input')
        this.loading = true
        this.form.tableNo = parseInt(this.form.tableNo)
        this.form.tableChairNo = parseInt(this.form.tableChairNo)
        this.form.Restaurant = this.restaurantId
        const res = await this.requestEditTable({
          $apollo: this.$apollo,
          payload: this.form,
          jwt: this.jwt
        })

        this.loading = false

        this.$notifier.showMessage({
          content: res.msg,
          color: res.code
        })

        if (res.code.toUpperCase() === API.SUCCESS) {
          await this.$router.push('/sales/order/table/manage')
        }
      }
    }
  }
}
</script>

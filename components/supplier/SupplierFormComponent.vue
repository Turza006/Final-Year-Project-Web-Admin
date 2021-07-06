<template>
  <v-card tile class="grey lighten-4">
    <v-card-title>{{ title }}</v-card-title>
    <v-divider />
    <v-form ref="form" class="pa-8">
      <v-container>
        <v-layout align-content-center>
          <v-flex md3 />
          <v-flex md6 content="center">
            <label class="ml-2">Supplier Name*</label>
            <v-text-field
              v-model="form.supplierName"
              class="mt-2"
              placeholder="First name"
              filled
              dense
              rounded
            />
            <label class="ml-2">Shop Name*</label>
            <v-text-field
              v-model="form.supplierShopName"
              class="mt-2"
              placeholder="First name"
              filled
              dense
              rounded
            />
            <label class="ml-2">Shop Address*</label>
            <v-text-field
              v-model="form.address"
              class="mt-2"
              placeholder="First name"
              filled
              dense
              rounded
            />
            <label class="ml-2">Shop email*</label>
            <v-text-field
              v-model="form.supplierEmail"
              :rules="emailRules"
              class="mt-2"
              placeholder="Shop email"
              filled
              dense
              rounded
            />
            <label class="ml-2">Phone No*</label>
            <v-text-field
              v-model="form.supplierPhoneNo"
              class="mt-2"
              placeholder="First name"
              filled
              dense
              rounded
            />
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions class="mb-5">
        <v-btn color="primary" class="px-10 mx-auto" small rounded @click="onSubmitSupplier">
          Submit
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { API } from '~/utils/apiStatusCode'
import ObjectDiff from '~/mixins/ObjectDiff'

export default {
  name: 'SupplierFormComponent',
  mixins: [ObjectDiff],
  props: {
    isEdit: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      title: '',
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      jwt: '',
      form: {
        supplierName: '',
        supplierPhoneNo: '',
        supplierEmail: '',
        supplierShopName: '',
        address: '',
        restaurantId: ''
      },
      initialValue: {},
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  mounted () {
    this.form = {
      ...this.$store.getters['supplier/singleSupplier']
    }
    this.initialValue = {
      ...this.$store.getters['supplier/singleSupplier']
    }
  },
  async created () {
    this.form.restaurantId = this.$store.getters['restaurant/restaurantId']
    this.jwt = this.$store.getters['auth/jwt']
    if (this.isEdit) {
      await this.$store.dispatch('supplier/requestGetSingleSupplier', {
        $apollo: this.$apollo,
        payload: {
          supplierId: this.$route.params.id
        },
        jwt: this.jwt
      })
      this.form = {
        ...this.$store.getters['supplier/singleSupplier']
      }
      this.title = 'Edit Supplier'
    } else {
      this.title = 'Add Supplier'
    }
  },
  methods: {
    async onSubmitSupplier () {
      // eslint-disable-next-line no-console
      if (this.jwt && this.$refs.form.validate()) {
        if (!this.isEdit) {
          const { data } = await this.$store.dispatch('supplier/requestAddSupplier', {
            $apollo: this.$apollo,
            payload: this.form,
            jwt: this.jwt
          })
          if (data !== null && data.code === API.SUCCESS) {
            this.$notifier.showMessage({
              content: data.msg,
              color: 'success'
            })
            await this.$router.push('/supplier/all')
          } else {
            this.$notifier.showMessage({
              content: data.msg,
              color: 'error'
            })
          }
        } else {
          const newObj = this.objectDiff(this.initialValue, this.form)
          await this.$store.dispatch('supplier/requestUpdateSingleSupplier', {
            $apollo: this.$apollo,
            payload: {
              payload: newObj,
              supplierId: this.initialValue.id
            },
            jwt: this.jwt
          })
          await this.$router.push('/supplier/all')
          console.log(newObj)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>

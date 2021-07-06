<template>
  <div>
    <span class="caption">Customer Info:</span>
    <v-btn class="float-right" x-small icon @click="show = !show">
      <v-icon>{{ show ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
    </v-btn>
    <v-divider />
    <v-form v-show="show" ref="form" class="mb-2">
      <v-row class="mt-1">
        <v-col class="py-0">
          <v-text-field
            v-model.trim.lazy="form.customerName"
            class="body-2"
            placeholder="customer name"
            dense
            hint="customer name"
            value="Walk-in"
          />
        </v-col>
        <v-col class="py-0">
          <v-text-field
            v-model.lazy="form.customerPhoneNo"
            class="body-2"
            placeholder="phone number"
            hint="customer phone number"
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <v-text-field
            v-model.trim.lazy="form.customerEmail"
            class="body-2"
            placeholder="email"
            hint="customer email"
            dense
          />
        </v-col>
        <v-col class="py-0">
          <v-text-field
            v-model.trim.lazy="form.customerAddress"
            class="body-2"
            placeholder="address"
            hint="customer address"
            dense
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { CREATE_ORDER_EVENT } from '~/utils/events'

export default {
  name: 'OrderCustomerInfoComponent',
  data () {
    return {
      // customerTypes: CUSTOMER_TYPE,
      show: true,
      form: {
        customerType: '',
        customerName: '',
        customerPhoneNo: '',
        customerEmail: '',
        customerAddress: ''
      },
      customerTypeRules: [
        v => !!v || 'Customer Type is required'
      ],
      customerNameRules: [
        v => !!v || 'Customer Name is required',
        v => v.length >= 3 || 'Customer Name must be at least 3 characters or more.'
      ],
      phoneNoRules: [
        v => !!v || 'Phone number is required',
        v => /(?=.*\d)/.test(v) || 'Phone number must contain number only',
        v => v.length === 14 || 'The phone number must be 14 digit long with country code.'
      ],
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid'
      ],
      addressRules: [
        v => !!v || 'Address is required'
      ]
    }
  },
  watch: {
    form: {
      deep: true,
      handler (form) {
        this.$store.commit('createOrder/UPDATE_CUSTOMER_INFO', form)
      }
    }
  },
  created () {
    this.$nuxt.$on(CREATE_ORDER_EVENT.CUSTOMER_INFO_REQUIRED, () => {
      this.$refs.form.validate()
    })
  }
}
</script>

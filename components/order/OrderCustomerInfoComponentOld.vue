<template>
  <v-form ref="form">
    <div>
      <span class="caption">Customer Info:</span>
      <v-divider />
    </div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-layout>
            <v-flex xs12 md6 sm12>
              <v-text-field
                v-model.trim.lazy="form.customerName"
                class="mt-2 body-2"
                placeholder="Customer name"
                label="Customer name"
                dense
                outlined
                value="Walk-in"
              />
            </v-flex>
            <v-flex xs12 md6 sm12>
              <v-text-field
                v-model.lazy="form.customerPhoneNo"
                class="mt-2 body-2"
                label="Customer Phone"
                placeholder="Phone"
                dense
                outlined
              />
            </v-flex>
<!--            <v-flex>
              <v-select
                v-model.lazy="form.customerType"
                class="mt-2"
                :items="customerTypes"
                label="Customer type"
                dense
                outlined
              />
            </v-flex>-->
          </v-layout>
          <v-layout>
            <v-flex>
              <v-text-field
                class="body-2"
                v-model.trim.lazy="form.customerEmail"
                label="Customer Email"
                placeholder="Email"
                dense
                outlined
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-text-field
                v-model.trim.lazy="form.customerAddress"
                class="body-2"
                label="Customer Address"
                placeholder="Customer address"
                dense
                outlined
              />
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { CREATE_ORDER_EVENT } from '~/utils/events'

export default {
  name: 'OrderCustomerInfoComponentOld',
  data () {
    return {
      // customerTypes: CUSTOMER_TYPE,
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

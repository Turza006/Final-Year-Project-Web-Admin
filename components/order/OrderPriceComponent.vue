<template>
  <div>
    <span class="caption">Bill:</span>
    <v-divider />
    <v-form ref="form" class="body-2">
      <div class="mt-2">
        <span>Subtotal: </span> <span class="float-right">{{ subTotal.toFixed(2) }}</span>
      </div>
      <div class="mt-1">
        <span>Service Fee: </span>
        <span class="float-right">{{ serviceFee.toFixed(2) }}</span>
<!--        <v-text-field
          class="float-right"
          type="number"
          placeholder="Service Fee"
          dense
          aria-required="true"
        />-->
      </div>
      <div class="mt-1">
        <span>Vat: </span>
        <span class="float-right">{{ vat.toFixed(2) }}</span>
<!--        <v-text-field
          class="float-right"
          type="number"
          placeholder="Vat"
          dense
          aria-required="true"
        />-->
      </div>
      <div class="mt-1">
        <span>Discount: </span>
        <v-text-field
          v-model.number="discountInput"
          class="float-right body-2"
          placeholder="Discount Amount"
          type="number"
          dense
          hide-details
          aria-required="true"
        />
      </div>
      <v-btn
        v-if="!show"
        class="my-5 mx-auto"
        text
        outlined
        x-small
        @click="show = !show"
      >
        <v-icon small>
          mdi-plus
        </v-icon>
        Add Other Fee
      </v-btn>
      <v-container>
        <v-row v-show="show" class="mt-5" style="width: 100%;">
          <v-col cols="7" class="pa-0">
            <v-text-field
              v-model.trim.lazy="otherFeeNameInput"
              class="mr-8 body-2"
              placeholder="Other Fee Name"
              dense
              hide-details
              label="Other Fee Name"
            />
          </v-col>
          <v-col class="pa-0">
            <v-text-field
              v-model.number="otherFeeAmountInput"
              class="mr-2 body-2"
              type="number"
              placeholder="Other Fee Amount"
              dense
              hide-details
            />
          </v-col>
          <v-col cols="2" class="pa-0" align="center">
            <v-btn
              v-if="show"
              icon
              small
              color="error"
              @click="show = !show"
            >
              <v-icon small>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <div class="pt-5 mb-2 title">
        <span>Total: </span> <span class="float-right pr-5">{{ totalPrice }}</span>
      </div>
<!--      <div class="py-2 mb-2">
        <v-radio-group v-model="paymentMethodInput" row label="Payment method:">
          <v-radio label="bkash" value="bkash" />
          <v-radio label="card" value="card" />
          <v-radio label="cash" value="cash" />
        </v-radio-group>
      </div>-->
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OrderPriceComponent',
  data () {
    return {
      show: false,
      discountInput: 0,
      otherFeeNameInput: '',
      otherFeeAmountInput: 0,
      paymentMethodInput: ''
    }
  },
  computed: {
    ...mapGetters('createOrder', ['subTotal', 'discount', 'vat', 'serviceFee', 'otherFeeName', 'otherFeeAmount', 'totalPrice', 'paymentMethod'])
  },
  watch: {
    async discountInput (newValue) {
      await this.$store.commit('createOrder/UPDATE_DISCOUNT', newValue)
      await this.$store.commit('createOrder/UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
    },
    async otherFeeNameInput (newValue) {
      await this.$store.commit('createOrder/UPDATE_OTHER_FEE_NAME', newValue)
    },
    async otherFeeAmountInput (newValue) {
      await this.$store.commit('createOrder/UPDATE_OTHER_FEE_AMOUNT', newValue)
      await this.$store.commit('createOrder/UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
    },
    async paymentMethodInput (newValue) {
      await this.$store.commit('createOrder/UPDATE_PAYMENT_METHOD', newValue)
    }
  },
  created () {
    this.discountInput = this.discount
    this.otherFeeNameInput = this.otherFeeName
    this.otherFeeAmountInput = this.otherFeeAmount
    this.paymentMethodInput = this.paymentMethod
  }
}
</script>

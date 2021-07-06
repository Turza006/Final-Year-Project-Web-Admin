<template>
  <div>
    <span class="caption">Order Items:</span>
    <v-btn class="float-right" x-small icon @click="show = !show">
      <v-icon>{{ show ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
    </v-btn>
    <v-divider />
    <div v-show="show">
      <div v-for="item in orderItems" :key="item.id" class="my-3">
        <span class="text-subtitle-2 font-weight-medium">{{ item.name }}</span>
        <span
          class="grey--text float-right "
        >{{ (item.price * item.qty).toFixed(2) }}
        </span>
        <br>
        <span class="caption font-weight-medium">{{ item.price.toFixed(2) }}</span>
        <span class="float-right">
          <v-btn text icon x-small @click="requestDecrementOrderItem({item})">
            <v-icon
              v-if="item.qty>1"
              color="primary"
            >mdi-minus</v-icon>
            <v-icon v-else color="primary">mdi-trash-can-outline</v-icon>
          </v-btn>
          {{ item.qty }}
          <v-btn text icon x-small @click="requestIncrementOrderItem({item})">
            <v-icon color="primary">mdi-plus</v-icon>
          </v-btn>
        </span>
      </div>
      <div class="d-block">
        <v-textarea
          id="note"
          v-model.trim.lazy="note"
          placeholder="Note"
          name="Note"
          cols="30"
          rows="2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrderItemComponent',
  props: {
    orderItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      show: true,
      note: ''
    }
  },
  watch: {
    note (newValue) {
      this.$store.commit('createOrder/UPDATE_NOTE', newValue)
    }
  },
  methods: {
    ...mapActions('createOrder', ['requestIncrementOrderItem', 'requestDecrementOrderItem'])
  }
}
</script>

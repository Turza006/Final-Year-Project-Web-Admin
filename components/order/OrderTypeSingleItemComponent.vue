<template>
  <v-card
    max-width="187"
    min-height="187"
    @click="onOrderTypeSelect(item)"
  >
    <v-img :src="item.image" height="150px" />
    <p class="subtitle-2 ma-2 text-center">
      {{ item.title }}
    </p>
  </v-card>
</template>

<script>
export default {
  name: 'OrderTypeSingleItemComponent',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onOrderTypeSelect (item) {
      await this.$store.commit('createOrder/SET_ORDER_TYPE', item.orderType)
      await this.$router.push(item.to)
    }
  }
}
</script>

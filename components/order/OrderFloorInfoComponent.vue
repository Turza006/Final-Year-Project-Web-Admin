<template>
  <v-card
    max-width="187"
    min-height="187"
    @click="onOrderTypeSelect(item)"
  >
    <v-img :src="item.image" height="150px" />
    <p class="subtitle-2 ma-2 text-center">
      {{ item.floorNo }}
    </p>
  </v-card>
</template>

<script>
export default {
  name: 'OrderFloorInfoComponent',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onOrderTypeSelect (item) {
      // await this.$store.commit('createOrder/SET_ORDER_TYPE', item.orderType)
      await this.$router.push('/sales/order/dining-tables/' + item.floorNo)
    }
  }
}

</script>

<style scoped>

</style>

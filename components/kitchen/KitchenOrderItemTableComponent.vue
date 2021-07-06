<template>
  <div>
    <v-simple-table class="white">
      <template #default>
        <thead>
          <tr>
            <th class="text-left">
              Item
            </th>
            <!--            <th class="text-left">
              Price
            </th>-->
            <th class="text-left">
              Qty
            </th>
            <!--            <th class="text-left">
              Total
            </th>-->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in orderItems"
            :key="item.name"
          >
            <td>{{ item.foodItem.name }}</td>
            <!--            <td>{{ item.price }}</td>-->
            <td>{{ item.qty }}</td>
            <!--            <td>{{ (item.price * item.qty).toFixed(2) }}</td>-->
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'KitchenOrderItemTableComponent',
  props: {
    orderItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {}
}
</script>

<style scoped>
.td-style {
  height: 30px !important;
  border-bottom: none !important;
}
</style>

<template>
  <v-card
    max-width="94"
    @click="addFoodItemIntoCart(item)"
  >
    <ImageComponent :image-name="item.image" />
    <p class="subtitle-2 ma-2 text-center">
      {{ item.name }}
    </p>
  </v-card>
</template>

<script>
import ImageComponent from '~/components/common/ImageComponent'
import { CREATE_ORDER_EVENT } from '~/utils/events'
export default {
  name: 'SingleFoodItemComponent',
  components: { ImageComponent },
  props: {
    item: {
      type: Object,
      required: true
    },
    itemType: {
      type: String,
      required: false,
      default: 'Food'
    }
  },
  data () {
    return {
      ON_ITEM_SELECTED: CREATE_ORDER_EVENT.ON_ITEM_SELECTED
    }
  },
  created () {
    console.log(this.itemType)
  },
  methods: {
    async addFoodItemIntoCart (item) {
      const finalPayload = {
        ...item,
        itemType: this.itemType
      }
      await this.$store.commit('createOrder/ADD_ORDER_ITEM', finalPayload)
      await this.$store.commit('createOrder/UPDATE_SUB_TOTAL_AND_TOTAL_PRICE')
    }
  }
}
</script>

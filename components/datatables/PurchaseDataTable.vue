<template>
  <v-data-table
    :headers="headers"
    :items="purchaseData.FoodItems"
    :search="search"
    :loading="loading"
    :options.sync="options"
    :server-items-length="purchaseData.count"
    class="grey lighten-4"
  >
    <template #[`item.image`]="{ item }">
      <div>
        <v-avatar class="my-2">
          <img
            v-if="item.image !== null"
            :src="imgBaseUrl + item.image"
            :alt="item.name"
          >
          <v-icon v-else>
            mdi-account
          </v-icon>
        </v-avatar>
      </div>
    </template>
    <template #[`item.updatedAt`]="{item}">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <span
            v-bind="attrs"
            v-on="on"
          >
            {{ item.updatedAt | _timeAgoFromMillis }}
          </span>
        </template>
        <span>{{ item.updatedAt | _milliToDate }}</span>
      </v-tooltip>
    </template>
    <template #[`item.actions`]="{item}">
      <v-btn class="ma-1" small outlined color="info" :to="`/menu/food/edit/${item.id}`">
        <v-icon small class="mr-1">
          mdi-pencil
        </v-icon>
        Edit
      </v-btn>
      <v-btn class="ma-1" small outlined color="error">
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Delete
      </v-btn>
    </template>
    <template v-if="isProduction" #[`item.qty`]="{item}">
      <v-container fill-height fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="pa-0">
            <v-text-field
              v-model.number="item.qty"
              name="quantity"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-if="isProduction" #[`item.update`]="{}">
      <v-btn class="ma-1" small outlined color="success">
        Update
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import DateConverterMixin from '~/mixins/DateConverterMixin'

export default {
  name: 'PurchaseDataTable',
  mixins: [DateConverterMixin],
  props: {
    selectedStatus: {
      type: String,
      required: true
    },
    purchaseData: {
      type: Object,
      required: true
    },
    isProduction: {
      type: Boolean,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: false
    }
  },
  data () {
    return {
      imgBaseUrl: process.env.IMAGE_BASE_URL,
      loading: false,
      search: '',
      headers: [
        {
          text: 'Supplier',
          value: 'supplier'
        },
        {
          text: 'Invoice No',
          value: 'invoiceNo'
        },
        {
          text: 'Price',
          value: 'price'
        },
        {
          text: 'Date',
          value: 'updatedAt'
        },

        {
          text: 'Quantity',
          value: 'qty'
        },
        {
          text: 'Update',
          value: 'update'
        },
        {
          text: 'Actions ',
          value: 'actions'
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        pageCount: 0,
        itemsLength: 0
      }
    }
  }
}
</script>

<style scoped>

</style>

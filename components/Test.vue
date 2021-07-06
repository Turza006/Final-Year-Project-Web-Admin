<template>
  <v-data-table
    :headers="headers"
    :items="sampleData"
    :expanded="expanded"
    item-key="id"
    show-expand
    class="elevation-1"
    @click:row="clicked"
  >
    <template #[`item.slNo`]="{ index }">
      {{ index + 1 + (options.page - 1) * options.itemsPerPage }}
    </template>

    <template #expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <span v-for="foodSubtype in item.foodSubtype" :key="foodSubtype.id">
          {{
            foodSubtype.foodSubTypeName
          }},
        </span>
      </td>
    </template>
    <template #[`item.actions`]="{ /*item, index*/ }">
      <v-btn class="ma-1" small outlined color="error">
        <v-icon small class="mr-1">
          mdi-delete
        </v-icon>
        Delete
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>

export default {
  name: 'MultiRowDatatableComponent',
  data () {
    return {
      expanded: ['Donut'],
      headers: [
        {
          text: 'Sl. No.',
          align: 'left',
          sortable: false,
          value: 'slNo'
        },
        {
          text: 'Food Type',
          value: 'foodType'
        },
        {
          text: 'Actions',
          value: 'actions'
        }
      ],
      sampleData: [
        {
          id: '1',
          foodType: 'Biriany',
          foodSubtype: [{
            id: 1,
            foodSubTypeName: 'Chicken'
          },
          {
            id: 2,
            foodSubTypeName: 'Kachchi'
          }]
        },
        {
          id: '2',
          foodType: 'Curry',
          foodSubtype: [{
            id: 1,
            foodSubTypeName: 'Fish'
          },
          {
            id: 2,
            foodSubTypeName: 'Chicken'
          }]
        }
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
        pageCount: 0,
        itemsLength: 0
      }
    }
  },
  methods: {
    clicked (value) {
      this.expanded.push(value)
    }
  }
}
</script>

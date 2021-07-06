<template>
  <v-card flat style="border-radius: 15px" class="mt-2" dense>
    <v-card-title v-if="link !== ''" class="primary--text py-2 cursor-pointer" @click="$router.push(link)">
      {{ chartTitle }}
    </v-card-title>
    <v-card-title v-else class="primary--text py-2">
      {{ chartTitle }}
    </v-card-title>
    <v-divider />
    <apexchart class="pa-3" type="bar" :options="options" :series="series" />
  </v-card>
</template>

<script>
export default {
  name: 'BarChart',
  props: {
    chartTitle: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    options: {
      chart: {
        id: 'barchart'
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      }
    },
    series: [
      {
        name: 'Work',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }),
  watch: {
    chartData: {
      deep: true,
      handler (chartData) {
        this.updateChart(chartData)
      }
    }
  },
  created () {
    this.updateChart(this.chartData)
  },
  methods: {
    updateChart (newData) {
      const updatedData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      newData.forEach((data, index) => {
        updatedData[data._id.month - 1] = data.count
      })
      this.series[0].data = updatedData
    }
  }
}
</script>

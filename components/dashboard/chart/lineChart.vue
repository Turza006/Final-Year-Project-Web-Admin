<template>
  <v-card flat style="border-radius: 15px" class="mt-2">
    <v-card-title class="primary--text py-2 cursor-pointer" @click="$router.push('/accounts/transactions')">
      Transactions
    </v-card-title>
    <v-divider />
    <apexchart class="pa-3" type="line" :options="options" :series="series" />
  </v-card>
</template>

<script>
export default {
  name: 'LineChart',
  props: {
    chartTitle: {
      type: String,
      required: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    options: {
      chart: {
        id: 'line-chart'
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
        name: 'Amount',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'Count',
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
      const updatedDataAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const updatedDataCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      let maxMonth = 0
      newData.forEach((data) => {
        updatedDataCount[data._id.month - 1] = data.count
        updatedDataAmount[data._id.month - 1] = data.totalAmount
        if (data._id.month > maxMonth) {
          maxMonth = data._id.month
        }
      })
      for (let i = maxMonth; i < 12; i++) {
        updatedDataCount[i] = null
        updatedDataAmount[i] = null
      }
      this.series[0].data = updatedDataAmount
      this.series[1].data = updatedDataCount
    }
  }
}
</script>

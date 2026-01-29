<template>
  <div class="chart-wrapper">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
)

export default defineComponent({
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData<'pie'>>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions<'pie'>>,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.chart-wrapper {
  height: 400px;
  position: relative;
}
</style>

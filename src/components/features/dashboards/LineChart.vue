<template>
  <div class="chart-wrapper">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData<'line'>>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions<'line'>>,
      required: false,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
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

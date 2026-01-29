<template>
  <div class="chart-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  ChartData,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip
)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartData: {
      type: Object as PropType<ChartData<'bar'>>,
      required: true
    },
    chartOptions: {
      type: Object as PropType<ChartOptions<'bar'>>,
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

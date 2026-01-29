<template>
  <div class="dashboard-view">
    <div class="dashboard-container">
      <div class="header">
        <h1>Dashboard</h1>
        <p class="subtitle">Przegląd statystyk i wykresów aplikacji</p>
      </div>
      <div class="chart-container">
        <div v-if="completedTodos + pendingTodos === 0" class="empty-state">
          <p>Brak danych do wyświetlenia wykresu. Dodaj zadania w widoku ToDo.</p>
        </div>
        <PieChart
        v-else
        :chart-data="pieChartData"
        :chart-options="pieChartOptions" />
      </div>
      <div class="chart-container">
        <BarChart
          :chart-data="barChartData"
          :chart-options="barChartOptions"
        />
      </div>
      <div class="chart-container">
        <LineChart
          :chart-data="lineChartData"
          :chart-options="lineChartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Todo } from '@/components/features/todo/TodoItem.vue'
import PieChart from '@/components/features/dashboards/PieChart.vue'
import BarChart from '@/components/features/dashboards/BarChart.vue'
import LineChart from '@/components/features/dashboards/LineChart.vue'

const STORAGE_KEY = 'vue-todos'

export default defineComponent({
  name: 'DashboardView',
  components: {
    PieChart,
    BarChart,
    LineChart
  },
  setup () {
    const todos = ref<Todo[]>([])

    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          todos.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading todos:', e)
        }
      }
    })

    const completedTodos = computed(() => todos.value.filter(t => t.completed).length)
    const pendingTodos = computed(() => todos.value.filter(t => !t.completed).length)

    const pieChartData = computed(() => ({
      labels: ['Ukończono', 'Oczekujące'],
      datasets: [
        {
          backgroundColor: ['#36A2EB', '#FF6384'],
          data: [completedTodos.value, pendingTodos.value]
        }
      ]
    }))

    const pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Wykres Kołowy Zadań ToDo (real data)',
          font: {
            size: 18,
            weight: 'bold' as const
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          display: true,
          position: 'bottom' as const
        }
      }
    }

    const barChartData = {
      labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'],
      datasets: [
        {
          label: 'Ukończone zadania',
          data: [3, 7, 5, 8, 4, 2, 1],
          backgroundColor: ['#ff6384', '#36A2EB', '#ff6384', '#36A2EB', '#ff6384', '#36A2EB', '#ff6384']
        }
      ]
    }
    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Aktywność w ciągu tygodnia (dummy data)',
          font: {
            size: 18,
            weight: 'bold' as const
          }
        },
        legend: {
          display: false,
          position: 'bottom' as const
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 12,
          ticks: {
            stepSize: 1
          }
        }
      }
    }

    const lineChartData = {
      labels: ['22 Sty', '23 Sty', '24 Sty', '25 Sty', '26 Sty', '27 Sty', '28 Sty'],
      datasets: [
        {
          label: 'Ukończone zadania',
          data: [2, 5, 3, 8, 4, 6, 7],
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4
        }
      ]
    }

    const lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Trend aktywności (dummy data)',
          font: {
            size: 18,
            weight: 'bold' as const
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 12,
          ticks: {
            stepSize: 1
          }
        }
      }
    }

    return {
      pieChartData,
      pieChartOptions,
      barChartData,
      barChartOptions,
      lineChartData,
      lineChartOptions,
      completedTodos,
      pendingTodos
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard-view {
  padding: 15px 10px;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  .dashboard-container {
    max-width: 100%;
    margin: 0 auto;
    .header {
      text-align: center;
      margin-bottom: 20px;
      background: #f8f9fa;
      padding: 15px 10px;
      border-radius: 8px;
      h1 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 8px;
        margin-top: 0;
        font-weight: 700;
      }
      .subtitle {
        color: #2c3e50;
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
  .chart-container {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    .empty-state {
      text-align: center;
      color: #888;
      font-size: 1rem;
      padding: 50px 0;
    }
  }

  // Tablet
  @media (min-width: 768px) {
    padding: 25px 20px;
    .dashboard-container {
      max-width: 800px;
      .header {
        margin-bottom: 30px;
        padding: 20px;
        h1 {
          font-size: 2rem;
        }
        .subtitle {
          font-size: 1rem;
        }
      }
    }
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: 40px 20px;
    .dashboard-container {
      .header {
        margin-bottom: 40px;
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>

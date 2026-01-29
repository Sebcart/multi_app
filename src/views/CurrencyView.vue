<template>
  <div class="currency-view">
    <div class="currency-container">
      <div class="header">
        <h1>Konwerter Walut</h1>
        <p class="subtitle">Przeliczaj waluty szybko i łatwo</p>
      </div>
    </div>
    <CurrencyConverter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CurrencyConverter from '@/components/features/currency/CurrencyConverter.vue'

export default defineComponent({
  name: 'CurrencyView',
  components: {
    CurrencyConverter
  }
})
</script>

<style scoped lang="scss">
.currency-view {
  padding: 15px 10px;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  .currency-container {
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

  // Tablet
  @media (min-width: 768px) {
    padding: 25px 20px;
    .currency-container {
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
    .currency-container {
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

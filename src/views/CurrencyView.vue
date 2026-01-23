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
  padding: 40px 20px;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  .currency-container {
    max-width: 800px;
    margin: 0 auto;
    .header {
      text-align: center;
      margin-bottom: 40px;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      h1 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin-bottom: 10px;
        margin-top: 0;
        font-weight: 700;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }
      .subtitle {
        color: #2c3e50;
        font-size: 1.1rem;
        margin: 0;
      }
    }
  }
}
</style>

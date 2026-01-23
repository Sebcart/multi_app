<template>
  <div class="currency-converter">
    <div class="converter-form">
      <div class="input-group">
        <label for="amount">Kwota:</label>
        <input
          id="amount"
          v-model.number="amount"
          type="number"
          placeholder="Wpisz kwotę"
          min="0"
          step="0.01"
        />
      </div>

      <div class="currency-selects">
        <div class="input-group">
          <label for="fromCurrency">Z waluty:</label>
          <select id="fromCurrency" v-model="fromCurrency">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <button @click="swapCurrencies" class="swap-btn" title="Zamień waluty">
          ⇄
        </button>

        <div class="input-group">
          <label for="toCurrency">Na walutę:</label>
          <select id="toCurrency" v-model="toCurrency">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>
      </div>

      <button @click="convertCurrency" class="convert-btn" :disabled="loading">
        {{ loading ? 'Przeliczanie...' : 'Przelicz' }}
      </button>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="result !== null" class="result">
        <h3>Wynik:</h3>
        <p class="result-amount">
          {{ amount }} {{ fromCurrency }} = {{ result.toFixed(2) }} {{ toCurrency }}
        </p>
        <p class="exchange-rate">
          Kurs wymiany: 1 {{ fromCurrency }} = {{ rate.toFixed(4) }} {{ toCurrency }}
        </p>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CurrencyConverter',
  setup () {
    const amount = ref<number>()
    const fromCurrency = ref<string>('PLN')
    const toCurrency = ref<string>('EUR')
    const result = ref<number | null>(null)
    const rate = ref<number>(0)
    const loading = ref<boolean>(false)
    const error = ref<string>('')
    const currencies = ref<string[]>([
      'USD', 'EUR', 'GBP', 'PLN', 'JPY', 'CHF', 'CAD', 'AUD',
      'CNY', 'INR', 'BRL', 'RUB', 'KRW', 'MXN', 'SEK', 'NOK',
      'DKK', 'CZK', 'HUF', 'TRY'
    ])

    const swapCurrencies = () => {
      const temp = fromCurrency.value
      fromCurrency.value = toCurrency.value
      toCurrency.value = temp

      if (result.value !== null) {
        convertCurrency()
      }
    }

    const convertCurrency = async () => {
      if (amount.value === undefined || amount.value <= 0) {
        error.value = 'Podaj prawidłową kwotę'
        return
      }

      loading.value = true
      error.value = ''
      result.value = null

      try {
        // API exchangerate-api.com
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
        )

        if (!response.ok) {
          throw new Error('Nie udało się pobrać kursów walut')
        }

        const data = await response.json()

        if (!data.rates[toCurrency.value]) {
          throw new Error('Nie znaleziono kursu dla wybranej waluty')
        }

        // Deadline simulation for better UX demonstration
        await new Promise(resolve => setTimeout(resolve, 500))

        rate.value = data.rates[toCurrency.value]
        result.value = amount.value * rate.value
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Wystąpił błąd podczas przeliczania'
        console.error('Error converting currency:', err)
      } finally {
        loading.value = false
      }
    }

    return {
      amount,
      fromCurrency,
      toCurrency,
      result,
      rate,
      loading,
      error,
      currencies,
      swapCurrencies,
      convertCurrency
    }
  }
})
</script>

<style scoped lang="scss">
.currency-converter {
  max-width: 800px;
  margin: 0 auto;

  .converter-form {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .input-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #495057;
      }

      input[type="number"],
      select {
        width: 100%;
        padding: 12px;
        border: 2px solid #dee2e6;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.3s;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: #667eea;
        }
      }
    }

    .currency-selects {
      display: flex;
      gap: 15px;
      align-items: flex-end;
      margin-bottom: 20px;

      .input-group {
        flex: 1;
        margin-bottom: 0;
      }

      .swap-btn {
        padding: 12px 16px;
        background: #6c757d;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 20px;
        transition: background 0.3s;
        margin-bottom: 2px;

        &:hover {
          background: #5a6268;
        }
      }
    }

    .convert-btn {
      width: 100%;
      padding: 14px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;

      &:hover:not(:disabled) {
        background: #556cd6;
      }

      &:disabled {
        background: #95a5a6;
        cursor: not-allowed;
      }
    }

    .error {
      margin-top: 20px;
      padding: 12px;
      background: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      border-radius: 6px;
    }

    .result {
      margin-top: 30px;
      padding: 20px;
      background: white;
      border-radius: 6px;
      border-left: 4px solid #667eea;

      h3 {
        margin-top: 0;
        color: #2c3e50;
      }

      .result-amount {
        font-size: 24px;
        font-weight: bold;
        color: #667eea;
        margin: 15px 0;
      }

      .exchange-rate {
        color: #6c757d;
        margin: 10px 0;
      }
    }
  }
}
</style>

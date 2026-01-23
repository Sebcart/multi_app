<template>
  <div class="home">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          Nauka przez Praktykę
        </h1>
        <p class="subtitle">
          Kolekcja aplikacji stworzonych w procesie nauki Vue.js
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="intro-card">
        <h2>👋 Witaj!</h2>
        <p>
          Ta strona to zbiór praktycznych aplikacji, które stworzyłem podczas nauki Vue.js.
          Każda aplikacja reprezentuje różne aspekty frameworka i pomogła mi w rozwijaniu
          umiejętności tworzenia nowoczesnych aplikacji webowych.
        </p>
      </div>

      <div class="features-grid">
        <AppCard
          icon="💱"
          title="Przelicznik Walut"
          description="Aplikacja do konwersji walut z wykorzystaniem darmowego API. Nauczyłem się tutaj pracy z API, obsługi stanów ładowania i zarządzania formularzami."
          link="/currency-converter"
        />

        <AppCard
          icon="📝"
          title="Lista Zadań"
          description="Klasyczna aplikacja TODO do zarządzania zadaniami. Przećwiczenie CRUD operations i lokalnego stanu."
          link="/todo"
        />

        <AppCard
          icon="🎮"
          title="Mini Gra"
          description="Interaktywna gra do nauki animacji i event handling w Vue."
          link="/game"
        />

        <AppCard
          icon="📊"
          title="Dashboard"
          description="Panel z wykresami i statystykami do nauki integracji bibliotek wykresów."
          :coming-soon="true"
        />
      </div>

      <div class="tech-stack">
        <h3>🛠️ Technologie</h3>
        <div class="tech-tags">
          <span class="tech-tag">Vue 3</span>
          <span class="tech-tag">TypeScript</span>
          <span class="tech-tag">Vue Router</span>
          <span class="tech-tag">Composition API</span>
          <span class="tech-tag">REST API</span>
          <span class="tech-tag">SCSS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppCard from '@/components/home/AppCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    AppCard
  }
})
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  color: white;
  text-align: center;

  .hero-content {
    max-width: 800px;
    margin: 0 auto;

    .main-title {
      font-size: 3rem;
      margin-bottom: 20px;
      font-weight: 700;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .subtitle {
      font-size: 1.3rem;
      opacity: 0.95;
      font-weight: 300;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  .intro-card {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-bottom: 50px;
    border-left: 5px solid #667eea;

    @media (max-width: 768px) {
      padding: 25px;
    }

    h2 {
      color: #2c3e50;
      font-size: 2rem;
      margin-bottom: 20px;
    }

    p {
      color: #5a6c7d;
      font-size: 1.1rem;
      line-height: 1.8;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 50px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .tech-stack {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 40px;
    border-radius: 12px;
    text-align: center;

    h3 {
      color: #2c3e50;
      font-size: 1.6rem;
      margin-bottom: 25px;
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;

      .tech-tag {
        background: white;
        color: #495057;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>

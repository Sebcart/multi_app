<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-brand">
        <span class="brand-icon">🎓</span>
        <span class="brand-text">Vue Learning</span>
      </router-link>

      <div class="nav-links">
        <router-link to="/" class="nav-link">
          <span class="link-icon">🏠</span>
          Home
        </router-link>
        <router-link to="/currency-converter" class="nav-link">
          <span class="link-icon">💱</span>
          Konwerter Walut
        </router-link>
        <router-link to="/todo" class="nav-link">
          <span class="link-icon">📝</span>
          Lista Zadań
        </router-link>
        <router-link to="/game" class="nav-link">
          <span class="link-icon">🎮</span>
          Mini Gra
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar'
})
</script>

<style scoped lang="scss">
.navbar {
  background: linear-gradient(135deg, #686868 0%, #363636 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
  transition: opacity 0.3s;
}

.nav-brand:hover {
  opacity: 0.8;
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  display: inline-block;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-link.router-link-exact-active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 15px;
  }

  .brand-text {
    font-size: 1.1rem;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }
}
</style>

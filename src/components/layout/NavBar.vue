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
        <router-link to="/dashboard" class="nav-link">
          <span class="link-icon">📊</span>
          Dashboard
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
  max-width: 100%;
  margin: 0 auto;
  padding: 12px 15px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
}
.brand-icon {
  font-size: 1.3rem;
}
.brand-text {
  display: inline-block;
}
.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  &.router-link-exact-active {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
.link-icon {
  font-size: 1rem;
}

// Tablet
@media (min-width: 768px) {
  .nav-container {
    padding: 15px 20px;
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
  .nav-brand {
    font-size: 1.2rem;
    gap: 10px;
  }
  .brand-icon {
    font-size: 1.4rem;
  }
  .nav-links {
    width: auto;
    gap: 15px;
    flex-wrap: nowrap;
  }
  .nav-link {
    font-size: 0.9rem;
    padding: 7px 14px;
    gap: 7px;
  }
  .link-icon {
    font-size: 1.05rem;
  }
}

// Desktop
@media (min-width: 1024px) {
  .nav-container {
    max-width: 1200px;
  }
  .nav-brand {
    font-size: 1.3rem;
  }
  .brand-icon {
    font-size: 1.5rem;
  }
  .nav-links {
    gap: 20px;
  }
  .nav-link {
    font-size: 1rem;
    padding: 8px 16px;
    gap: 8px;
    border-radius: 8px;
  }
  .link-icon {
    font-size: 1.1rem;
  }
}
</style>

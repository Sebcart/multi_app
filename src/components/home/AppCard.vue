<template>
  <div :class="['app-card', { 'coming-soon': comingSoon }]">
    <div class="app-icon">{{ icon }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <router-link v-if="!comingSoon && link" :to="link" class="app-link">
      Przejdź do aplikacji →
    </router-link>
    <span v-if="comingSoon" class="soon-badge">Wkrótce</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: ''
    },
    comingSoon: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
.app-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:not(.coming-soon):hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  &.coming-soon {
    opacity: 0.7;
  }

  .app-icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  h3 {
    color: #2c3e50;
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  p {
    color: #6c757d;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .app-link {
    display: inline-block;
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: #556cd6;
    }
  }

  .soon-badge {
    display: inline-block;
    background: #e9ecef;
    color: #6c757d;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>

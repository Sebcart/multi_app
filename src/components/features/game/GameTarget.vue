<template>
  <div
    class="game-target"
    :class="[shape, { exploding: isExploding }]"
    @click="handleClick"
  ></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameTarget',
  props: {
    isExploding: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: 'circle'
    }
  },
  setup (_, { emit }) {
    const handleClick = () => {
      emit('target-hit')
    }

    return {
      handleClick
    }
  }
})
</script>

<style scoped lang="scss">
@keyframes explode {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    transform: scale(2) rotate(180deg);
    opacity: 0.8;
    filter: brightness(2) hue-rotate(90deg);
  }
  100% {
    transform: scale(3) rotate(360deg);
    opacity: 0;
    filter: brightness(3) hue-rotate(180deg);
  }
}

.game-target {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #ff1717, #ff687f);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  &.circle {
    border-radius: 50%;
  }
  &.square {
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea, #764ba2);
  }
  &.triangle {
    width: 0;
    height: 0;
    background: transparent;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 40px solid #fa79de;
    box-shadow: none;
  }
  &.star {
    background: linear-gradient(135deg, #ffeb3b, #f5ff9a);
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }
  &.diamond {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    transform: rotate(45deg);
    border-radius: 8px;
  }
  &.exploding {
    animation: explode 0.4s ease-out forwards !important;
    pointer-events: none;
  }

  // Tablet
  @media (min-width: 768px) {
    width: 45px;
    height: 45px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.2);
    &.triangle {
      border-left: 22px solid transparent;
      border-right: 22px solid transparent;
      border-bottom: 45px solid #fa79de;
    }
  }

  // Desktop
  @media (min-width: 1024px) {
    width: 50px;
    height: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    &.square {
      border-radius: 10px;
    }
    &.triangle {
      border-left: 25px solid transparent;
      border-right: 25px solid transparent;
      border-bottom: 50px solid #fa79de;
    }
    &.diamond {
      border-radius: 10px;
    }
  }
}
</style>

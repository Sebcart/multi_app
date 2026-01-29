<template>
  <div
    class="game-board"
    :class="{ 'game-isPlaying': isPlaying }"
    @click="playShootSound"
  >
    <div v-if="!isPlaying && !showScore" class="welcome-message">
      <p>Kliknij "Start", aby rozpocząć grę!</p>
    </div>
    <div v-if="!isPlaying && showScore" class="showScore">
      <h2>Twoj wynik: {{ score }}</h2>
      <p>Kliknij "Start", aby zagrać ponownie!</p>
    </div>
    <TransitionGroup name="fade">
      <GameTarget
        v-for="target in targets"
        :key="target.id"
        :is-exploding="target.isExploding"
        :shape="target.shape"
        :style="{
          top: target.y + 'px',
          left: target.x + 'px',
          position: 'absolute',
        }"
        @target-hit="onTargetClick(target.id)"
      />
    </TransitionGroup>
  </div>
  <div class="game-nav">
    <div class="score-display">Score: {{ score }}</div>
    <div v-if="isPlaying" class="timer">⏱️ {{ timeLeft }}s</div>
    <button v-if="!isPlaying" @click="startGame()" class="game-button">
      Start
    </button>
    <button v-if="isPlaying" @click="stopGame()" class="game-button">
      Stop
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import GameTarget from '@/components/features/game/GameTarget.vue'

export default defineComponent({
  name: 'GameBoard',
  components: {
    GameTarget
  },
  setup () {
    const isPlaying = ref<boolean>(false)
    const score = ref<number>(0)
    const showScore = ref<boolean>(false)
    const timeLeft = ref<number>(30)
    const timerInterval = ref<number | null>(null)
    const targets = ref<
      Array<{
        id: number;
        x: number;
        y: number;
        isExploding?: boolean;
        shape: string;
      }>
    >([])
    const shapes = ['circle', 'square', 'triangle', 'star', 'diamond']
    const shootSound = new Audio('/sounds/shoot.mp3')
    const hitTargetSound = new Audio('/sounds/hitTarget.wav')
    const mainMusic = new Audio('/sounds/mainTheme.mp3')
    const stopGameSound = new Audio('/sounds/stopGame.wav')
    shootSound.volume = 0.4
    hitTargetSound.volume = 0.3
    stopGameSound.volume = 1
    mainMusic.volume = 0.1

    const startGame = () => {
      mainMusic.currentTime = 0
      mainMusic.play()
      isPlaying.value = true
      score.value = 0
      showScore.value = false
      targets.value = []
      timeLeft.value = 30

      spawnTarget()

      timerInterval.value = setInterval(() => {
        timeLeft.value--
        if (timeLeft.value <= 0) {
          stopGame()
        }
      }, 1000)
    }

    const stopGame = () => {
      stopGameSound.currentTime = 0
      stopGameSound.play()
      mainMusic.pause()
      isPlaying.value = false
      targets.value = []
      showScore.value = true
      if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
      }
    }

    const spawnTarget = () => {
      if (!isPlaying.value) return

      // Responsive rozmiary - dostosowane do rozmiaru ekranu i rozmiaru celu
      const targetSize = window.innerWidth > 1024 ? 50 : window.innerWidth > 768 ? 45 : 40
      // Maksymalna pozycja = szerokość/wysokość planszy - rozmiar celu
      const boardWidth = window.innerWidth > 1024 ? 750 : window.innerWidth > 768 ? 620 : window.innerWidth - 80
      const boardHeight = window.innerWidth > 1024 ? 350 : window.innerWidth > 768 ? 300 : 250

      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
      const newTarget = {
        id: Date.now(),
        x: Math.random() * (boardWidth - targetSize),
        y: Math.random() * (boardHeight - targetSize),
        isExploding: false,
        shape: randomShape
      }
      targets.value.push(newTarget)
    }

    const onTargetClick = (id: number) => {
      const target = targets.value.find((t) => t.id === id)
      if (!target || target.isExploding) return
      score.value++
      hitTargetSound.currentTime = 0
      hitTargetSound.play()
      target.isExploding = true
      setTimeout(() => {
        targets.value = targets.value.filter((t) => t.id !== id)
        spawnTarget()
      }, 100)
    }

    const playShootSound = () => {
      if (!isPlaying.value) return
      shootSound.currentTime = 0
      shootSound.play()
    }

    return {
      isPlaying,
      score,
      targets,
      showScore,
      timeLeft,
      startGame,
      stopGame,
      onTargetClick,
      playShootSound
    }
  }
})
</script>

<style scoped lang="scss">
.game-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  padding: 12px 10px;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background: linear-gradient(135deg, #686868 0%, #363636 100%);
  color: white;
  border-radius: 10px;
  .score-display {
    font-size: 14px;
    font-weight: 600;
  }
  .timer {
    font-size: 14px;
    font-weight: 600;
  }
  .game-button {
    padding: 8px 12px;
    font-size: 14px;
    color: #fff;
    background-color: #667eea;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #5561b3;
    }
  }
}
.game-board {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .welcome-message,
  .showScore {
    text-align: center;
    font-size: 18px;
    color: #333;
    padding: 0 15px;
    h2 {
      font-size: 1.5rem;
      margin: 10px 0;
    }
    p {
      font-size: 0.9rem;
    }
  }
}
.game-isPlaying {
  cursor: crosshair;
  background-color: #000;
}

// Tablet
@media (min-width: 768px) {
  .game-nav {
    margin: 15px auto;
    padding: 15px;
    width: 95%;
    max-width: 700px;
    border-radius: 15px;
    .score-display,
    .timer {
      font-size: 18px;
    }
    .game-button {
      padding: 10px 18px;
      font-size: 15px;
    }
  }
  .game-board {
    height: 350px;
    width: 95%;
    max-width: 700px;
    .welcome-message,
    .showScore {
      font-size: 20px;
      h2 {
        font-size: 1.8rem;
      }
      p {
        font-size: 1rem;
      }
    }
  }
}

// Desktop
@media (min-width: 1024px) {
  .game-nav {
    margin: 20px auto;
    padding: 20px;
    width: 800px;
    max-width: 800px;
    border-radius: 20px;
    .score-display,
    .timer {
      font-size: 22px;
    }
    .game-button {
      padding: 10px 20px;
      font-size: 16px;
    }
  }
  .game-board {
    height: 400px;
    width: 800px;
    max-width: 800px;
    .welcome-message,
    .showScore {
      font-size: 24px;
      h2 {
        font-size: 2rem;
      }
      p {
        font-size: 1.1rem;
      }
    }
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
</style>

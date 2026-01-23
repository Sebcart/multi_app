<template>
  <div class="game-board" :class="{ 'game-isPlaying': isPlaying }" @click="playShootSound">
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
        :style="{ top: target.y + 'px', left: target.x + 'px', position: 'absolute' }"
        @target-hit="onTargetClick(target.id)"
      />
    </TransitionGroup>
  </div>
  <div class="game-nav">
    <div class="score-display">Score: {{ score }}</div>
    <div v-if="isPlaying" class="timer">⏱️ {{ timeLeft }}s</div>
    <button v-if="!isPlaying" @click="startGame()" class="game-button">Start</button>
    <button v-if="isPlaying" @click="stopGame()" class="game-button">Stop</button>
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
    const targets = ref<Array<{ id: number; x: number; y: number; isExploding?: boolean; shape: string }>>([])
    const shapes = ['circle', 'square', 'triangle', 'star', 'diamond']
    const shootSound = new Audio('/sounds/hit.mp3')
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
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
      const newTarget = {
        id: Date.now(),
        x: Math.random() * 700,
        y: Math.random() * 300,
        isExploding: false,
        shape: randomShape
      }
      targets.value.push(newTarget)
    }

    const onTargetClick = (id: number) => {
      const target = targets.value.find(t => t.id === id)
      if (!target || target.isExploding) return
      score.value++
      hitTargetSound.currentTime = 0
      hitTargetSound.play()
      target.isExploding = true
      setTimeout(() => {
        targets.value = targets.value.filter(t => t.id !== id)
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
    margin: 20px auto 20px;
    padding: 20px;
    box-sizing: border-box;
    width: 800px;
    background: linear-gradient(135deg, #686868 0%, #363636 100%);
    color: white;
    border-radius: 20px;
    .score-display {
      font-size: 22px;
      font-weight: 600;
    }
    .timer {
      font-size: 22px;
      font-weight: 600;
    }
    .game-button {
      padding: 10px 20px;
      font-size: 16px;
      color: #fff;
      background-color: #667eea;
      border: none;
      border-radius: 5px;
      font-weight: bold;;
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
    height: 400px;
    width:800px;
    margin: 0 auto;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    .welcome-message, .showScore {
      text-align: center;
      font-size: 24px;
      color: #333;
    }
  }
  .game-isPlaying {
    cursor: crosshair;
    background-color: #000;
  }

  .fade-enter-active {
    transition: all 0.3s ease;
  }
  .fade-enter-from {
    opacity: 0;
    transform: scale(0.5);
  }
</style>

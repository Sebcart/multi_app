<template>
  <form @submit.prevent="handleSubmit" class="todo-form">
    <input
      v-model="newTodo"
      type="text"
      placeholder="Dodaj nowe zadanie..."
      class="todo-input"
    />
    <button type="submit" class="add-btn" :disabled="!newTodo.trim()">
      Dodaj
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'TodoForm',
  emits: ['add-todo'],
  setup (props, { emit }) {
    const newTodo = ref<string>('')

    const handleSubmit = () => {
      if (newTodo.value.trim()) {
        emit('add-todo', newTodo.value.trim())
        newTodo.value = ''
      }
    }

    return {
      newTodo,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="scss">
.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  .todo-input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #dee2e6;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-color: #667eea;
    }
    &::placeholder {
      color: #adb5bd;
    }
  }
  .add-btn {
    padding: 12px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s;
    white-space: nowrap;
    &:hover:not(:disabled) {
      background: #556cd6;
    }
    &:disabled {
      background: #adb5bd;
      cursor: not-allowed;
    }
  }

  // Tablet and PC
  @media (min-width: 768px) {
    gap: 10px;
    margin-bottom: 30px;
    .todo-input {
      padding: 14px 18px;
      font-size: 16px;
    }
    .add-btn {
      padding: 14px 24px;
      font-size: 16px;
    }
  }
}
</style>

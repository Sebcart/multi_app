<template>
  <div :class="['todo-item', { completed: todo.completed }]">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="todo-checkbox"
      />
      <span class="todo-text">{{ todo.text }}</span>
    </div>
    <button @click="$emit('delete', todo.id)" class="delete-btn" title="Usuń">
      🗑️
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export default defineComponent({
  name: 'TodoItem',
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  emits: ['toggle', 'delete']
})
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  &.completed {
    opacity: 0.6;
    .todo-text {
      text-decoration: line-through;
      color: #adb5bd;
    }
  }

  .todo-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
    .todo-checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #667eea;
      flex-shrink: 0;
    }
    .todo-text {
      font-size: 15px;
      color: #2c3e50;
      word-break: break-word;
    }
  }
  .delete-btn {
    padding: 6px 10px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.3s;
    opacity: 0.5;
    flex-shrink: 0;
    &:hover {
      background: #fee;
      opacity: 1;
    }
  }

  // Tablet and PC
  @media (min-width: 768px) {
    padding: 16px 20px;
    margin-bottom: 12px;
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateX(5px);
    }
    .todo-content {
      gap: 15px;

      .todo-text {
        font-size: 16px;
      }
    }
    .delete-btn {
      padding: 8px 12px;
    }
  }
}
</style>

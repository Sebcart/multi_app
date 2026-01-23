<template>
  <div class="todo-view">
    <div class="todo-container">
      <div class="header">
        <h1>Lista Zadań</h1>
        <p class="subtitle">Zarządzaj swoimi zadaniami efektywnie</p>
      </div>

      <div class="todo-card">
        <TodoForm @add-todo="addTodo" />
        <TodoList
          :todos="todos"
          :filter="currentFilter"
          @toggle="toggleTodo"
          @delete="deleteTodo"
          @update:filter="currentFilter = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import TodoForm from '@/components/features/todo/TodoForm.vue'
import TodoList, { FilterType } from '@/components/features/todo/TodoList.vue'
import { Todo } from '@/components/features/todo/TodoItem.vue'

const STORAGE_KEY = 'vue-todos'

export default defineComponent({
  name: 'TodoView',
  components: {
    TodoForm,
    TodoList
  },
  setup () {
    const todos = ref<Todo[]>([])
    const currentFilter = ref<FilterType>('all')

    // Wczytaj z localStorage
    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          todos.value = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading todos:', e)
        }
      }
    })

    // Zapisz do localStorage przy każdej zmianie
    watch(todos, (newTodos) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos))
    }, { deep: true })

    const addTodo = (text: string) => {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false
      }
      todos.value.unshift(newTodo)
    }

    const toggleTodo = (id: number) => {
      const todo = todos.value.find(t => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    const deleteTodo = (id: number) => {
      todos.value = todos.value.filter(t => t.id !== id)
    }

    return {
      todos,
      currentFilter,
      addTodo,
      toggleTodo,
      deleteTodo
    }
  }
})
</script>

<style scoped lang="scss">
.todo-view {
  min-height: calc(100vh - 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;

  .todo-container {
    max-width: 800px;
    margin: 0 auto;
    .header {
      text-align: center;
      margin-bottom: 40px;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      h1 {
        color: #2c3e50;
        font-size: 2.5rem;
        margin-bottom: 10px;
        margin-top: 0;
        font-weight: 700;
        @media (max-width: 768px) {
          font-size: 2rem;
        }
      }
      .subtitle {
        color: #2c3e50;
        font-size: 1.1rem;
        margin: 0;
      }
    }

    .todo-card {
      background: #f8f9fa;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

      @media (max-width: 768px) {
        padding: 25px;
      }
    }
  }
}
</style>

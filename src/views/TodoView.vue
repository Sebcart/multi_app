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
  padding: 15px 10px;
  min-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  .todo-container {
    max-width: 100%;
    margin: 0 auto;
    .header {
      text-align: center;
      margin-bottom: 20px;
      background: #f8f9fa;
      padding: 15px 10px;
      border-radius: 8px;
      h1 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 8px;
        margin-top: 0;
        font-weight: 700;
      }
      .subtitle {
        color: #2c3e50;
        font-size: 0.9rem;
        margin: 0;
      }
    }
    .todo-card {
      background: #f8f9fa;
      padding: 20px 15px;
      border-radius: 10px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    }
  }

  // Tablet
  @media (min-width: 768px) {
    padding: 25px 20px;
    .todo-container {
      max-width: 800px;
      .header {
        margin-bottom: 30px;
        padding: 20px;
        h1 {
          font-size: 2rem;
        }
        .subtitle {
          font-size: 1rem;
        }
      }
      .todo-card {
        padding: 30px 25px;
        border-radius: 12px;
        box-shadow: 0 9px 35px rgba(0, 0, 0, 0.18);
      }
    }
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: 40px 20px;
    .todo-container {
      .header {
        margin-bottom: 40px;
        h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .subtitle {
          font-size: 1.1rem;
        }
      }
      .todo-card {
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>

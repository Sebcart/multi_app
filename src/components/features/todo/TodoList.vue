<template>
  <div class="todo-list">
    <div class="filters">
      <button
        v-for="filterOption in filters"
        :key="filterOption"
        :class="['filter-btn', { active: filter === filterOption }]"
        @click="$emit('update:filter', filterOption)"
      >
        {{ filterLabels[filterOption] }}
      </button>
    </div>

    <div v-if="filteredTodos.length === 0" class="empty-state">
      <span class="empty-icon">📝</span>
      <p>{{ emptyMessage }}</p>
    </div>

    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />

    <div v-if="todos.length > 0" class="stats">
      <span>Pozostało: {{ activeCount }}</span>
      <span>Ukończono: {{ completedCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import TodoItem, { Todo } from './TodoItem.vue'

export type FilterType = 'all' | 'active' | 'completed'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array as PropType<Todo[]>,
      required: true
    },
    filter: {
      type: String as PropType<FilterType>,
      default: 'all'
    }
  },
  emits: ['toggle', 'delete', 'update:filter'],
  setup (props) {
    const filters: FilterType[] = ['all', 'active', 'completed']

    const filterLabels: Record<FilterType, string> = {
      all: '🌟 Wszystkie',
      active: '⏳ Aktywne',
      completed: '✅ Ukończone'
    }

    const filteredTodos = computed(() => {
      switch (props.filter) {
        case 'active':
          return props.todos.filter(todo => !todo.completed)
        case 'completed':
          return props.todos.filter(todo => todo.completed)
        default:
          return props.todos
      }
    })

    const activeCount = computed(() =>
      props.todos.filter(todo => !todo.completed).length
    )

    const completedCount = computed(() =>
      props.todos.filter(todo => todo.completed).length
    )

    const emptyMessage = computed(() => {
      switch (props.filter) {
        case 'active':
          return 'Brak aktywnych zadań!'
        case 'completed':
          return 'Brak ukończonych zadań'
        default:
          return 'Brak zadań. Dodaj pierwsze zadanie!'
      }
    })

    return {
      filters,
      filterLabels,
      filteredTodos,
      activeCount,
      completedCount,
      emptyMessage
    }
  }
})
</script>

<style scoped lang="scss">
.todo-list {
  .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    .filter-btn {
      padding: 10px 16px;
      background: #f8f9fa;
      border: 2px solid transparent;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      color: #6c757d;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background: #e9ecef;
      }
      &.active {
        background: white;
        border-color: #667eea;
        color: #667eea;
      }
    }
  }
  .empty-state {
    text-align: center;
    padding: 40px 15px;
    color: #adb5bd;
    .empty-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 15px;
    }
    p {
      font-size: 16px;
      margin: 0;
    }
  }
  .stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
    padding: 12px 16px;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #6c757d;
  }

  // Tablet and PC
  @media (min-width: 768px) {
    .filters {
      gap: 10px;
      margin-bottom: 25px;
      .filter-btn {
        padding: 10px 20px;
        font-size: 14px;
      }
    }
    .empty-state {
      padding: 60px 20px;
      .empty-icon {
        font-size: 4rem;
        margin-bottom: 20px;
      }
      p {
        font-size: 18px;
      }
    }
    .stats {
      flex-direction: row;
      justify-content: space-between;
      margin-top: 25px;
      padding: 15px 20px;
      font-size: 14px;
    }
  }
}
</style>

<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(todo.id)">
      <div class="form-check flex-grow-1">
        <label class="form-check-label" :class="{ todo: todo.completed }">
          <input class="form-check-input" type="checkbox" :checked="todo.completed" @change="toggleTodo(index)" />
          {{ todo.subject }}
        </label>
      </div>
      <div><button class="btn btn-danger btn-small" @click="deleteTodo(index)">Delete</button></div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'todo-idx'],
  setup(props, { emit }) {
    const router = useRouter();
    const toggleTodo = (index) => {
      emit('toggle-todo', index);
    };

    const deleteTodo = (index) => {
      emit('todo-idx', index);
    };

    const moveToPage = (todoId) => {
      console.log(todoId);

      // router.push('/todos/' + todoId);
      //:to로 작성하기 위해서(:to를 사용하면 routes에서 name을 사용하는데, 그렇게 사용하면 나중에 path가 변경되었을 때 유지보수 할 때 편리함) :id를 받아오기 위해서는 밑에처럼 라우터를 푸시해주어야한다.
      router.push({
        name: 'todo',
        params: {
          id: todoId,
          // id는 /router에 :id로 작성해주었기 때문에 id로 해야한다.
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
    };
  },
};
</script>

<style></style>

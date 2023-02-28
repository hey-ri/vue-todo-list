<template>
  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!todoList.length">추가된 Todo가 없습니다.</div>
    <div v-for="(todo, index) in todoList" :key="todo.id" class="card mt-2">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <label class="form-check-label" :class="{ todo: todo.completed }">
            <input class="form-check-input" type="checkbox" v-model="todo.completed" />
            {{ todo.subject }}
          </label>
        </div>
        <div><button class="btn btn-danger btn-small" @click="deleteTodo(index)">Delete</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleForm,
  },
  setup() {
    const todoList = ref([]);

    const addTodo = (todo) => {
      //인자 todo는 자식 컴포넌트에서 받아온 것을 의미함
      console.log(todo);
      todoList.value.push(todo);
    };

    const deleteTodo = (index) => {
      todoList.value.splice(index, 1);
    };

    return {
      addTodo,
      todoList,
      deleteTodo,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>

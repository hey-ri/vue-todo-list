<template>
  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!todoList.length">추가된 Todo가 없습니다.</div>

    <TodoList :todos="todoList" />
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
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

<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input type="text" v-model="searchText" class="form-control" placeholder="Search" />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!filterTodos.length" style="text-align: center; padding-top: 5px">Todo가 없습니다.</div>

    <TodoList :todos="filterTodos" @toggle-todo="toggleTodo" @todo-idx="deleteTodo" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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

    const toggleTodo = (index) => {
      console.log(index);

      console.log(todoList.value[index]);
      todoList.value[index].completed = !todoList.value[index].completed;
      console.log(todoList.value[index]); // 앞뒤로 콘솔을 찍어주면서 트루, 폴스의 값을 확인하기
    };

    const searchText = ref('');
    const filterTodos = computed(() => {
      if (searchText.value) {
        return todoList.value.filter((todo) => todo.subject.includes(searchText.value));
      }

      return todoList.value;
    });

    return {
      addTodo,
      todoList,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
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

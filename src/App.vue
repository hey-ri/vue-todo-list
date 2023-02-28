<template>
  <div class="container">
    <p>count : {{ count }}</p>
    <p>doublecount : {{ doubleCount }}</p>
    <button @click="count++">Add one</button>
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!todoList.length">추가된 Todo가 없습니다.</div>

    <TodoList :todos="todoList" @toggle-todo="toggleTodo" @todo-idx="deleteTodo" />
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

    const count = ref(1);
    const doubleCount = computed(() => {
      //state가 다른 state를 의존할때 사용함
      //computed는 state를 감시하고 있다가 값이 변경되면 그 값을 참조하여 값을 바꾸는 것을 의미함
      //값을 캐싱하고 있음 함수=메소드와 다른 점은 인자로 무엇인가를 받을 수 없음
      return count.value * 2;
    });

    return {
      addTodo,
      todoList,
      deleteTodo,
      toggleTodo,
      count,
      doubleCount,
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

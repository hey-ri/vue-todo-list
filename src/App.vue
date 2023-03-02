<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input type="text" v-model="searchText" class="form-control" placeholder="Search" />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red; text-align: center; padding-top: 5px">{{ error }}</div>

    <div v-if="!filterTodos.length" style="text-align: center; padding-top: 5px">Todo가 없습니다.</div>

    <TodoList :todos="filterTodos" @toggle-todo="toggleTodo" @todo-idx="deleteTodo" />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todoList = ref([]);
    const error = ref('');
    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos');
        todoList.value = res.data;
        console.log(res);
      } catch (err) {
        console.log(err);
        error.value = 'Somthing went wrong get todo';
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      //인자 todo는 자식 컴포넌트에서 받아온 것을 의미함
      console.log(todo);
      error.value = '';
      //데이터 베이스 투두를 저장하기
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        todoList.value.push(res);
      } catch (err) {
        console.log(err);
        error.value = 'Somthing went wrong add todo';
      }
      // .then((res) => {
      //   //.then을 해주는 이유는 axios는 promise로 값을 반환하는데(비동기적) 그 행동이 끝나고 완료되었을 때~(.then일때~)그때 무슨 일을 해라 라는 의미로 사용됨
      //   console.log(res);
      //   todoList.value.push(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   error.value = 'Somthing went wrong';
      // });
    };

    const deleteTodo = async (index) => {
      error.value = '';
      //id를 index로 찾기
      const id = todoList.value[index].id;
      try {
        //데이터베이스에서도 삭제 가능하게
        const res = await axios.delete('http://localhost:3000/todos/' + id);
        console.log(res);
        //배열에서 삭제하게
        todoList.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong from delete';
      }
    };

    const toggleTodo = async (index) => {
      console.log(index);

      error.value = '';
      //id를 index로 찾기
      const id = todoList.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todoList.value[index].completed,
        });
        //배열 업데이트
        console.log(todoList.value[index]);
        todoList.value[index].completed = !todoList.value[index].completed;
        console.log(todoList.value[index]); // 앞뒤로 콘솔을 찍어주면서 트루, 폴스의 값을 확인하기
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong from completed';
      }
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
      error,
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

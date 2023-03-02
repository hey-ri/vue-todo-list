<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input type="text" v-model="searchText" class="form-control" placeholder="Search" />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red; text-align: center; padding-top: 5px">{{ error }}</div>

    <div v-if="!todoList.length" style="text-align: center; padding-top: 5px">Todo가 없습니다.</div>

    <TodoList :todos="todoList" @toggle-todo="toggleTodo" @todo-idx="deleteTodo" />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" @click="getTodos(currentPage - 1)" v-if="currentPage !== 1" style="cursor: pointer">
            Previous
          </a>
        </li>
        <li v-for="page in totalPage" :key="page" class="page-item" :class="currentPage === page ? 'active' : ''">
          <a class="page-link" @click="getTodos(page)" style="cursor: pointer"> {{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            @click="getTodos(currentPage + 1)"
            v-if="totalPage !== currentPage"
            style="cursor: pointer"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
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
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    //마지막 페이지
    const totalPage = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const searchText = ref('');

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        // console.log(res.headers);
        //결과의 headers에서 x-total-count를 받아온다.
        // console.log(res.headers.x-total-count);
        //-로 이어져 있는 변수는 []로 감싸고 ''로 묶어줘야 한다.
        numberOfTodos.value = res.headers['x-total-count'];
        todoList.value = res.data;
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

    // const filterTodos = computed(() => {
    //   if (searchText.value) {
    //     return todoList.value.filter((todo) => todo.subject.includes(searchText.value));
    //   }

    //   return todoList.value;
    // });
    watch(searchText, (current, prev) => {
      console.log(current, prev);
      getTodos(1);
    });

    return {
      addTodo,
      todoList,
      deleteTodo,
      toggleTodo,
      searchText,
      // filterTodos,
      error,
      totalPage,
      currentPage,
      getTodos,
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

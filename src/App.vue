<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input type="text" v-model="searchText" class="form-control" placeholder="Search" />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red; text-align: center; padding-top: 5px">{{ error }}</div>

    <div v-if="!filterTodos.length" style="text-align: center; padding-top: 5px">Todo가 없습니다.</div>

    <TodoList :todos="filterTodos" @toggle-todo="toggleTodo" @todo-idx="deleteTodo" />
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
import { ref, computed, watchEffect } from 'vue';
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

    watchEffect(() => {
      console.log(currentPage.value);
      console.log(numberOfTodos.value);
      //   //initial 값이 찍히고, 그 reactive state값이 있거나 ref 값 혹은 props, computed의 값 변경이 되면 이 watchEffect의 함수가 다시 실행이 됨 그래서 두개의 콘솔을 찍었을 때의 결과 값이 1 0 1 12로 나옴 1,0은 처음의 값으로 currentPage의 ref이니셜 값이 1이니까 1이 찍히고, numberOfTodos도 마찬가지로 0이 이니셜 값이니까 0 이 찍힌다. numberOfTodos의 값이 json-server에 의해 변화하기 때문에 1,12의 값이 다시 표출 되는 것인데, 현재 json server에 12개의 todos가 들어있어서 12로 나타나는 것이다.
      //하지만 숫자나 default한것을 변수에 담으면 값이 변경되지 않음
    });

    //마지막 페이지
    const totalPage = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
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

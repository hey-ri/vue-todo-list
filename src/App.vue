<template>
  <div class="container">
    <h1>To-Do List</h1>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input type="text" v-model="todo" class="form-control" placeholder="write the new to-do" />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div v-show="hasError" style="color: red; font-weight: bold">This field can't be empty</div>
    </form>
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

export default {
  setup() {
    const todo = ref('');
    const todoList = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray',
    };

    const onSubmit = () => {
      // e.preventDefault(); @submit:prevent가 같은 역할을 함
      if (todo.value === '') {
        hasError.value = true;
      } else {
        console.log(todo.value);
        todoList.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';
      }
    };

    const deleteTodo = (index) => {
      todoList.value.splice(index, 1);
    };

    return {
      todo,
      onSubmit,
      todoList,
      hasError,
      todoStyle,
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

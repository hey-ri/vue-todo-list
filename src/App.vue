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
    <div v-for="todo in todoList" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="todo.completed" />
          <label class="form-check-label" :style="todo.completed ? todoStyle : {}">
            {{ todo.subject }}
          </label>
        </div>
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

    return {
      todo,
      onSubmit,
      todoList,
      hasError,
      todoStyle,
    };
  },
};
</script>

<style>
.name {
  color: #5a4c3a;
}

.names {
  color: red;
}
</style>

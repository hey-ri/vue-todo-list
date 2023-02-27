<template>
  <div class="container">
    <h1>To-Do List</h1>
    <form class="d-flex" @submit.prevent="onSubmit">
      <div class="flex-grow-1 mr-2">
        <input type="text" v-model="todo" class="form-control" placeholder="write the new to-do" />
      </div>
      <div>
        <button class="btn btn-primary" type="submit">Add</button>
      </div>
    </form>
    {{ todoList }}
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    const todoList = ref([]);

    const onSubmit = () => {
      // e.preventDefault(); @submit:prevent가 같은 역할을 함
      console.log(todo.value);
      todoList.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    return {
      todo,
      onSubmit,
      todoList,
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

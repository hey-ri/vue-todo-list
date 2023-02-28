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
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const todo = ref("");
    const todoList = ref([
      {
        id: 1,
        subject: "배터리바꾸기",
      },
      {
        id: 2,
        subject: "우유사기",
      },
    ]);
    const hasError = ref(false);

    const onSubmit = () => {
      // e.preventDefault(); @submit:prevent가 같은 역할을 함
      if (todo.value === "") {
        hasError.value = true;
      } else {
        console.log(todo.value);
        todoList.value.push({
          id: Date.now(),
          subject: todo.value,
        });
        hasError.value = false;
      }
    };

    return {
      todo,
      onSubmit,
      todoList,
      hasError,
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

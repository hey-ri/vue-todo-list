<template>
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
</template>
<script>
import { ref, getCurrentInstance } from 'vue';
export default {
  emits: ['add-todo'],
  setup() {
    const todo = ref('');
    const hasError = ref(false);

    const { emit } = getCurrentInstance();

    const onSubmit = () => {
      // e.preventDefault(); @submit:prevent가 같은 역할을 함
      if (todo.value === '') {
        hasError.value = true;
      } else {
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        // console.log(todo.value);
        // todoList.value.push({
        //   id: Date.now(),
        //   subject: todo.value,
        //   completed: false,
        // });
        hasError.value = false;
        todo.value = '';
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>
<style></style>

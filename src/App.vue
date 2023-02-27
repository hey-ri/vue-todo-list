<template>
  <div v-show="toggle">true</div>
  <div v-show="!toggle">false</div>
  <!-- style로 display none을 통해 show되고 none 됨 -->
  <div v-if="toggle">true</div>
  <div v-else>false</div>
  <!-- v-show는 초기 렌더링 비용이 많이 들고, v-if v-else는 toggle하는데에 비용이 많이 든다. show는 toggle을 많이 할 때 쓰면 좋고, 거의 바뀌지 않을 경우에 v-if를 사용하면 좋다.  -->
  <button @click="onToggle">toggle</button>
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
    const toggle = ref(false);
    const todo = ref("");
    const todoList = ref([
      {
        id: 1,
        subject: "배터리바꾸기",
      },
      {
        id: 2,
        subject: "안과가기",
      },
    ]);

    const onSubmit = () => {
      // e.preventDefault(); @submit:prevent가 같은 역할을 함
      console.log(todo.value);
      todoList.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    };

    return {
      todo,
      onSubmit,
      todoList,
      toggle,
      onToggle,
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

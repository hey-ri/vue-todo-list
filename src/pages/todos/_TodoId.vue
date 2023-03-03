<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else>
    <div class="form-group">
      <label>Todo Subject</label>
      <input v-model="todo.subject" type="text" class="form-control" />
    </div>
    <button class="btn btn-primary">save</button>
  </form>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    //클릭해서 들어온 todo page의 인덱스 번호를 나타내줌
    console.log(route.params.id);
    const todo = ref(null);
    const loading = ref(true);

    const getTodo = async () => {
      //async await로 요청을 하고 받아오는 것을 비동기로 처리하고 결과를 res에 담아서 콘솔에서 확인한다. 그러고 나서 콘솔에서 확인 한 값을 가지고 또 다시 데이터에 접근 가능하게 만들 수 있다.
      const res = await axios.get('http://localhost:3000/todos/' + route.params.id);

      // console.log(res);
      todo.value = res.data;
      loading.value = false;
    };

    getTodo();

    return {
      todo,
      loading,
    };
  },
};
</script>
<style></style>

<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'InCompleted' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-outline-danger mr-2" @click="moveToTodolistPage">cancel</button>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">save</button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
  <div id="hey">ri</div>
</template>
<script>
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute();
    //클릭해서 들어온 todo page의 인덱스 번호를 나타내줌
    console.log(route.params.id);
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const router = useRouter();

    const todoId = route.params.id;

    const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

    // const showToast = ref(false);
    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const timeout = ref(null);
    // const triggerToast = (message, type = 'success') => {
    //   toastMessage.value = message;
    //   showToast.value = true;
    //   toastAlertType.value = type;

    //   timeout.value = setTimeout(() => {
    //     console.log('셋 타임 아웃 실행중');
    //     toastAlertType.value = '';
    //     toastMessage.value = 's';
    //     showToast.value = false;
    //   }, 3000);
    // };

    const getTodo = async () => {
      //async await로 요청을 하고 받아오는 것을 비동기로 처리하고 결과를 res에 담아서 콘솔에서 확인한다. 그러고 나서 콘솔에서 확인 한 값을 가지고 또 다시 데이터에 접근 가능하게 만들 수 있다.
      try {
        const res = await axios.get(`http://localhost:3000/todos/${todoId}`);

        // console.log(res);
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        console.log(err);
        triggerToast('somthing went to wrong from server', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodolistPage = () => {
      router.push({
        name: 'todos',
      });
    };

    getTodo();

    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });

        console.log(res);
        originalTodo.value = { ...res.data };
        triggerToast('Successfully saved!');
      } catch (err) {
        console.log(err);
        triggerToast('Something went to wrong from server', 'danger');
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodolistPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
    };
  },
};
</script>
<style></style>

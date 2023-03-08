<template>
  <div v-if="loading">Loading...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <!-- <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
          <div v-if="subjectError" class="text-error">{{ subjectError }}</div>
        </div> -->
        <Input label="subject" v-model:subject="todo.subject" :error="subjectError" />
        <!-- v-model은 여러개를 사용할 수 있음, 하나의 데이터를 바인딩 하려면 v-model:으로 해줘야 하지만 하나의 데이터를 바인딩 하면 v-model='todo.subject'로 적어줘도 된다. 그럴 때의 자식 컴포넌트의 props는 modelValue로 해야 하며, emit으로 보내는 값에도 ~~:modelValue로 이름을 지어주어야 한다.  -->
      </div>
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              type="submit"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click.prevent="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'InCompleted' }}
            </button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-outline-danger mr-2" @click.prevent="moveToTodolistPage">cancel</button>
      <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
        {{ editing ? 'update' : 'create' }}
      </button>
    </div>
  </form>
</template>

<script>
import axios from '@/axios';
import { ref, computed, onUpdated } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';
import { useToast } from '@/composables/toast';
import Input from '@/components/Input.vue';

export default {
  components: {
    Input,
  },
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute();
    //클릭해서 들어온 todo의 인덱스 번호를 나타내줌
    console.log(route.params.id);
    const todo = ref({
      subject: '',
      completed: false,
      body: '',
    });
    const originalTodo = ref(null);
    const loading = ref(false);
    const router = useRouter();

    const todoId = route.params.id;

    const subjectError = ref('');

    const { showToast, toastMessage, toastAlertType, triggerToast } = useToast();

    onUpdated(() => {
      console.log(todo.value.subject);
    });

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
      loading.value = true;
      //async await로 요청을 하고 받아오는 것을 비동기로 처리하고 결과를 res에 담아서 콘솔에서 확인한다. 그러고 나서 콘솔에서 확인 한 값을 가지고 또 다시 데이터에 접근 가능하게 만들 수 있다.
      try {
        const res = await axios.get(`todos/${todoId}`);

        // console.log(res);
        /* 
        todo 를 res에 담고
         ㄴ> todo.value = res.data
        originalTodo.value = res.data
        라고 하면 둘다 같은 주소를 바라보기 때문에 그것을 같은 객체에 담으면 그 값이 변했는지 아닌지 비교를 하지 못하게 되고
        그러면 update 혹은 create 버튼의 disabled를 시킬 수 없다. 그래서 {...res.data}로 정의를 해주어야한다.
        */
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (err) {
        console.log(err);
        triggerToast('somthing went to wrong from server', 'danger');
        loading.value = false;
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

    if (props.editing) {
      getTodo();
    }

    const onSave = async () => {
      //validation
      subjectError.value = '';
      if (!todo.value.subject) {
        subjectError.value = 'subject is required';
        return;
      }
      try {
        let res;
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        if (props.editing) {
          res = await axios.put(`todos/${todoId}`, data);
          console.log('editing', res);
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post(`todos`, data);
          console.log('create', res);
          todo.value.subject = '';
          todo.value.body = '';
        }

        const message = 'Successfully ' + (props.editing ? 'updated!' : 'created!');
        triggerToast(message);

        if (!props.editing) {
          router.push({
            name: 'todos',
          });
        }
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
      subjectError,
    };
  },
};
</script>
<style></style>

<style>
/* 이렇게 2개의 style 태그를 넣을 수 있으며 두개를 넣는데 scoped가 써지지 않은 style은 전역으로 적용이 가능하다 */
</style>

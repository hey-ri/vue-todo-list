<template>
  <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(todo.id)" style="cursor: pointer">
      <div class="flex-grow-1">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(index, $event)"
          @click.stop
          class="mr-2"
          style="cursor: pointer"
        />
        <span :class="{ todo: todo.completed }">
          {{ todo.subject }}
        </span>
      </div>
      <div><button class="btn btn-danger" @click.stop="openModal(todo.id)">Delete</button></div>
    </div>
  </div>
  <Teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </Teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

export default {
  components: { Modal },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'todo-idx'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    let todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = () => {
      emit('todo-idx', todoDeleteId.value);

      showModal.value = false;
      todoDeleteId = null;
    };

    const moveToPage = (todoId) => {
      console.log(todoId);

      // router.push('/todos/' + todoId);
      //:to로 작성하기 위해서(:to를 사용하면 routes에서 name을 사용하는데, 그렇게 사용하면 나중에 path가 변경되었을 때 유지보수 할 때 편리함) :id를 받아오기 위해서는 밑에처럼 라우터를 푸시해주어야한다.
      router.push({
        name: 'todo',
        params: {
          id: todoId,
          // id는 /router에 :id로 작성해주었기 때문에 id로 해야한다.
        },
      });
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };
    const closeModal = (id) => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>

<style></style>

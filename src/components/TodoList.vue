<template>
  <!-- <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2"> -->
  <List :items="todos">
    <template #default="{ item, index }">
      <!-- #defuault혹은 v-slot:default로 대체 가능, 밑에 줄 부터 todo. 으로 즉 그 저네 있던 v-for에 todo에 더이상 List 컴포넌트에서 slot을 사용중이기 때문에 사용, 접근을 하지 못함 따라서 List 컴포넌트에서 :item으로 데이터를 올려줬음 근데 그 slot에 name을 써주지 않았는데 써주지 않으면 그냥 default로 접근이 가능함 또 그것을 slotProps로 정해주었고 그것은 객체로 올라오기 때문에 slotProps.item.어쩌구로 접근이 가능함 index도 사용해 주었기 때문에 index도 올려주었음 -->
      <!-- template 부분이 List 파일 slot에 들어감 -->
      <div class="card-body p-2 d-flex align-items-center" @click="moveToPage(item.id)" style="cursor: pointer">
        <div class="flex-grow-1">
          <input
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
            class="mr-2"
            style="cursor: pointer"
          />
          <span :class="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div><button class="btn btn-danger" @click.stop="openModal(item.id)">Delete</button></div>
      </div>
    </template>
  </List>
  <!-- </div> -->
  <Teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </Teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from '@/components/List.vue';

export default {
  components: {
    Modal,
    List,
  },
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
    const todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = () => {
      emit('todo-idx', todoDeleteId.value);

      showModal.value = false;
      todoDeleteId.value = null;
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

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ name: 'home' }">Hey Ri</router-link>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'todos' }">Todos</router-link>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-view />
    </div>
    <Toast />
  </div>
</template>

<script>
import Toast from './components/Toast.vue';
// import { useToast } from './composables/toast';
// import { useStore } from 'vuex';
export default {
  components: {
    Toast,
  },
  // setup() {
  //   const { toastMessage, toastAlertType, showToast, triggerToast } = useToast();
  //   console.log(showToast.value);

  //   const store = useStore();
  //   console.log(store.state);
  //   console.log(store.state.toastAlertType);

  //   return {
  //     toastMessage,
  //     toastAlertType,
  //     showToast,
  //     triggerToast,
  //   };
  // },
};
</script>

<style></style>

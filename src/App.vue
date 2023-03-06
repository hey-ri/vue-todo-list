<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view />
    </div>
    <Toast />
  </div>
</template>

<script>
import Toast from './components/Toast.vue';
import Navbar from './components/Navbar.vue';
// import { useToast } from './composables/toast';
// import { useStore } from 'vuex';
export default {
  components: {
    Toast,
    Navbar,
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

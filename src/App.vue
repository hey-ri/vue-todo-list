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
    <transition name="slide">
      <Toast v-if="showToast" :message="toastMessage" :type="toastAlertType" />
    </transition>
  </div>
</template>

<script>
import Toast from './components/Toast.vue';
import { useToast } from './composables/toast';
import { useStore } from 'vuex';
export default {
  components: {
    Toast,
  },
  setup() {
    const { toastMessage, toastAlertType, showToast, triggerToast } = useToast();
    console.log(showToast.value);

    const store = useStore();
    console.log(store.state);
    console.log(store.state.toastAlertType);

    return {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast,
    };
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-80px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

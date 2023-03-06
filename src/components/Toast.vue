<template>
  <div class="toast-box">
    <transition-group name="slide">
      <!-- transition 안에는 하나의 tag 만 올 수 있다. 그럴때는 transition-group을 쓰면 된다. -->
      <div v-for="toast in toasts" :key="toast.id" class="alert" :class="`alert-${toast.type}`" role="alert">
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>
<script>
import { useToast } from '@/composables/toast';

export default {
  setup() {
    const { toasts } = useToast();
    return {
      toasts,
    };
  },
};
</script>
<style scoped>
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}

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

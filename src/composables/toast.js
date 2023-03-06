import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();

  //computed 사용 이유, 값이 변경 된것을 감지하려고.
  const showToast = computed(() => store.state.showToast);
  const toastMessage = computed(() => store.state.toastMessage);
  const toastAlertType = computed(() => store.state.toastAlertType);
  const timeOut = computed(() => store.state.timeOut);
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    showToast.value = true;
    toastAlertType.value = type;

    timeOut.value = setTimeout(() => {
      console.log('셋 타임 아웃 실행중');
      toastAlertType.value = '';
      toastMessage.value = '';
      showToast.value = false;
    }, 3000);
  };

  onUnmounted(() => {
    clearTimeout(timeOut.value);
  });
  return {
    showToast,
    toastMessage,
    toastAlertType,
    triggerToast,
    onUnmounted,
  };
};

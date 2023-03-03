import { ref, onUnmounted } from 'vue';

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref('');
  const toastAlertType = ref('');
  const timeOut = ref(null);
  const triggerToast = (message, type = 'success') => {
    toastMessage.value = message;
    showToast.value = true;
    toastAlertType.value = type;

    timeOut.value = setTimeout(() => {
      console.log('셋 타임 아웃 실행중');
      toastAlertType.value = '';
      toastMessage.value = 's';
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

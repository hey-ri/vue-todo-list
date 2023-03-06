import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
  const store = useStore();

  //computed 사용 이유, 값이 변경 된것을 감지하려고.
  const showToast = computed(() => store.state.showToast);
  const toastMessage = computed(() => store.getters.toastMessageWithSmile);
  const toastAlertType = computed(() => store.state.toastAlertType);
  // const timeOut = computed(() => store.state.timeOut);

  const triggerToast = (message, type = 'success') => {
    /*  toastMessage.value = message;
    showToast.value = true;
    toastAlertType.value = type;
    
    timeOut.value = setTimeout(() => {
      console.log('셋 타임 아웃 실행중');
      toastAlertType.value = '';
      toastMessage.value = '';
      showToast.value = false;
    }, 3000); */

    //vuex의 액션을 취하고 싶을 때는 dispatch
    store.dispatch('triggerToast', message, type);
  };

  //app.vue에서만 toast를 사용할 것이기 때문에 app.vue를 나간다는 것은 이 앱 자체를 나간다는 것이기 때문에 밑에줄이 필요 없어진다.
  // onUnmounted(() => {
  //   clearTimeout(timeOut.value);
  // });
  return {
    showToast,
    toastMessage,
    toastAlertType,
    triggerToast,
  };
};

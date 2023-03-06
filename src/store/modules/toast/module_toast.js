export default {
  namespaced: true,
  state: {
    toasts: [],
    // showToast: false,
    // toastMessage: '',
    // toastAlertType: '',
  },
  mutations: {
    // UPDATE_TOAST_MESSAGE(state, payload) {
    //   state.toastMessage = payload;
    // },
    // UPDATE_TOAST_ALERT_TYPE(state, payload) {
    //   state.toastAlertType = payload;
    // },
    // UPDATE_TOAST_STATUS(state, payload) {
    //   state.showToast = payload;
    // },
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
  actions: {
    triggerToast({ commit }, message, type = 'success') {
      // toastMessage.value = message;
      // toastAlertType.value = type;
      // showToast.value = true;
      // commit('UPDATE_TOAST_MESSAGE', message);
      // commit('UPDATE_TOAST_ALERT_TYPE', type);
      // commit('UPDATE_TOAST_STATUS', true);

      commit('ADD_TOAST', {
        id: Date.now(),
        message: message,
        type: type,
      });

      setTimeout(() => {
        console.log('셋 타임 아웃 실행중');
        // toastAlertType.value = '';
        // toastMessage.value = '';
        // showToast.value = false;
        // commit('UPDATE_TOAST_ALERT_TYPE', '');
        // commit('UPDATE_TOAST_MESSAGE', '');
        // commit('UPDATE_TOAST_STATUS', false);
        commit('REMOVE_TOAST');
      }, 8000);
    },
  },
  getters: {
    toastMessageWithSmile(state) {
      //vuex 안에서 사용하는 computed와 같다.
      return state.toastMessage + ' :)';
    },
  },
};

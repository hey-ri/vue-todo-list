export default {
  namespaced: true,
  state: {
    showToast: false,
    toastMessage: '',
    toastAlertType: '',
  },
  mutations: {
    UPDATE_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload;
    },
    UPDATE_TOAST_ALERT_TYPE(state, payload) {
      state.toastAlertType = payload;
    },
    UPDATE_TOAST_STATUS(state, payload) {
      state.showToast = payload;
    },
  },
  actions: {
    triggerToast({ commit }, message, type = 'success') {
      // toastMessage.value = message;
      commit('UPDATE_TOAST_MESSAGE', message);
      // toastAlertType.value = type;
      commit('UPDATE_TOAST_ALERT_TYPE', type);
      // showToast.value = true;
      commit('UPDATE_TOAST_STATUS', true);

      setTimeout(() => {
        console.log('셋 타임 아웃 실행중');
        commit('UPDATE_TOAST_ALERT_TYPE', '');
        // toastAlertType.value = '';
        commit('UPDATE_TOAST_MESSAGE', '');
        // toastMessage.value = '';
        commit('UPDATE_TOAST_STATUS', false);
        // showToast.value = false;
      }, 3000);
    },
  },
  getters: {
    toastMessageWithSmile(state) {
      //vuex 안에서 사용하는 computed와 같다.
      return state.toastMessage + ' :)';
    },
  },
};

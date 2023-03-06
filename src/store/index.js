import { createStore } from 'vuex';

export default createStore({
  state: {
    showToast: true,
    toastMessage: 'ddd',
    toastAlertType: '',
    timeOut: null,
  },
});

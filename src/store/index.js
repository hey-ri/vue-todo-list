import { createStore } from 'vuex';
import toastModules from './modules/modules';

export default createStore({
  modules: toastModules,
});

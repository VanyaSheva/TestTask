import Vue from 'vue';
import Vuex from 'vuex';
import getPackages from './getPackages'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
  },
  getters: {
    error: (s) => s.error,
  },
  modules: {
    getPackages
  },
});
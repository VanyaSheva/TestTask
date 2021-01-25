import Vue from 'vue';
import Vuex from 'vuex';
import getPackages from './getPackages'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    getPackages
  },
});
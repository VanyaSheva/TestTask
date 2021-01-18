import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/main.scss';
import store from './store';
import Paginate from 'vuejs-paginate';
import 'vue-loaders/dist/vue-loaders.css';
import VueLoaders from 'vue-loaders';


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueLoaders);

Vue.component('Paginate', Paginate);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});


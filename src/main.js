import Vue from 'vue';
import mainStyle from '@/styles/main.scss';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  mainStyle,
  render: (h) => h(App),
}).$mount('#app');

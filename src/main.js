import Vue from 'vue';
import FishUI from 'fish-ui';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(FishUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

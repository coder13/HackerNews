import Vue from 'vue';
import Router from 'vue-router';
import Item from '@/components/Item';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: {
      template: '<div></div>',
    },
  }, {
    path: '/item/:id',
    name: 'item',
    component: Item,
    props: true,
  }],
});

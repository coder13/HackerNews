import Vue from 'vue';
import Router from 'vue-router';
import StoryList from '@/components/StoryList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StoryList',
      component: StoryList,
    },
  ],
});

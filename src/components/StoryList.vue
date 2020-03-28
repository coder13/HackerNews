<template>
  <div class="container">
    <div span="16" v-for="story in visibleStories()"
      :key="story" is="Story" :id="story">
    </div>
  </div>
</template>

<script>
import Story from './Story';
import { fetchTopStories } from '../lib/api';

export default {
  name: 'StoryList',
  components: {
    Story,
  },
  data() {
    return {
      stories: [],
      page: 0,
      pageSize: 20,
    };
  },
  methods: {
    visibleStories() {
      const stories = this.stories.slice(this.page * this.pageSize,
        (this.page + 1) * this.pageSize);
      return stories;
    },
  },
  mounted() {
    fetchTopStories().then((data) => {
      console.log(data);
      this.stories = data;
    });
  },
};
</script>

<style>
.container {
  padding: 2em;
}
</style>

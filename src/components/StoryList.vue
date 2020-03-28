<template>
  <div class="container">
    <div v-for="story in visibleStories()"
      :key="story" is="Story" :id="story">
    </div>
    <fish-segment color="black">
      <a @click="loadMore">Load more...</a>
    </fish-segment>
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
      page: 1,
      pageSize: 20,
    };
  },
  methods: {
    loadMore() {
      this.page += 1;
    },
    visibleStories() {
      const stories = this.stories.slice(0, this.page * this.pageSize);
      return stories;
    },
  },
  mounted() {
    fetchTopStories().then((data) => {
      this.stories = data;
    });
  },
};
</script>

<style>
.container {
  margin: .5em;
}
</style>

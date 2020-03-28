<template>
  <fish-card class="story">
    <div slot="header">
      <a :href="url" target="_blank">{{this.title}}</a>
    </div>
    {{this.score}} |
    <router-link :to="{name: 'item', params: {id: this.id}}">{{this.kids.length}} comments</router-link>
  </fish-card>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Story',
  props: ['id'],
  data() {
    return {
      by: undefined,
      descendants: [],
      score: undefined,
      kids: [],
      time: undefined,
      title: undefined,
      type: undefined,
      url: undefined,
    };
  },
  methods: {
    commentsURL() {
      return `/${this.id}`;
    },
  },
  created() {
    fetchItem(this.id).then((data) => {
      this.by = data.by;
      this.descendants = data.descendants;
      this.score = data.score;
      this.kids = data.kids || [];
      this.time = data.time;
      this.title = data.title;
      this.type = data.type;
      this.url = data.url;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.story {
  margin-bottom: 1em;
}
</style>

<template>
  <fish-card fluid class="story">
    <div slot="header">
      <a :href="url" target="_blank">{{this.title}}</a>
    </div>
    <span class="score">{{this.score}}</span>
    by <span class="by">{{this.by}}</span>
    <span class="time">{{this.ago()}}</span>
    <router-link :to="{name: 'Item', params: {id: this.id}}">
      {{this.descendants}} comments
    </router-link>
  </fish-card>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Story',
  props: {
    id: {
      type: Number,
      default: undefined,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
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
    ago() {
      const seconds = (Date.now() / 1000) - this.time;
      if (seconds < 60) {
        return `${Math.round(seconds)} seconds ago`;
      } if (seconds / 60 < 60) {
        return `${Math.round(seconds / 60)} minutes ago`;
      } if (seconds / 3600 < 24) {
        return `${Math.round(seconds / 3600)} hours ago`;
      } if (seconds / (3600 * 24) < 365) {
        return `${Math.round(seconds / (3600 * 24))} days ago`;
      }
      return `It don't matter no more, you do the math: ${this.time}`;
    },
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
  margin-top: 1em;
  background-color: #efefef;
}
</style>

<template>
  <fish-segment :loading="fetching" :attached="attached" :color="color()" class="comment">
    <p>
      <span v-if="score" class="score">{{score}}</span>
      <span v-if="title" class="title">
        <a :href="url" target="_blank">{{title}}</a>
      </span>
      {{title ? by : ''}}<span v-if="by" class="by">{{by}}</span>
      <span v-if="time" class="time">
        <router-link :to="{name: 'item', params: {id: this.id}}">{{ago()}}</router-link>
      </span>
    </p>
    <p class="comment--text" v-html="text"></p>
    <div v-for="(kid, index) in visibleKids()" :key="kid">
      <Item :id="kid" :depth="depth+1"
        :attached="visibleKids().length === 1 ? false : (index === 0 ? 'top' : (index === visibleKids().length - 1 && !more() ? 'bottom' : ''))"/>
    </div>
    <fish-segment attached="bottom" v-if="more()">
      <a @click="readMore">Read More...</a>
    </fish-segment>
  </fish-segment>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Item',
  props: {
    attached: {
      default: false,
    },
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
      fetching: true,
      by: undefined,
      score: undefined,
      parent: undefined,
      kids: [],
      text: undefined,
      time: undefined,
      title: undefined,
      type: undefined,
      url: undefined,
      descendants: undefined,
      limit: true,
    };
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData();
  },
  methods: {
    ago() {
      const seconds = (Date.now() / 1000) - this.time;
      if (seconds < 60) {
        return `${Math.round(seconds)} seconds ago`;
      } else if (seconds / 60 < 60) {
        return `${Math.round(seconds / 60)} minutes ago`;
      } else if (seconds / 3600 < 24) {
        return `${Math.round(seconds / 3600)} hours ago`;
      } else if (seconds / (3600 * 24) < 365) {
        return `${Math.round(seconds / (3600 * 24))} days ago`;
      }
      return `It don't matter no more, you do the math: ${this.time}`;
    },
    more() {
      return this.descendants > 3 && this.limit;
    },
    color() {
      return ['red', 'orange', 'yellow', 'green', 'blue', 'violet'][this.depth % 6];
    },
    readMore() {
      this.limit = false;
    },
    visibleKids() {
      return (this.limit ? this.kids.slice(0, 3) : this.kids)
        .sort((a, b) => b.time - a.time);
    },
    fetchData() {
      this.fetching = true;
      fetchItem(this.id).then((data) => {
        if (data) {
          this.fetching = false;
          this.by = data.by;
          this.descendants = data.descendants;
          this.score = data.score;
          this.kids = data.kids || [];
          this.text = data.text;
          this.time = data.time;
          this.title = data.title;
          this.type = data.type;
          this.url = data.url;

          if (this.title) {
            document.title = `${this.title} | Hacker News`;
          }
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment {
  background-color: #efefef;
  padding: 1em;
}

.comment--text {
  font-size: 1.25em;
}
</style>

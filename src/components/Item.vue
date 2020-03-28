<template>
  <fish-segment :loading="fetching" class="comments">
    <p>
      <span v-if="score" class="score">{{score}}</span>
      <span v-if="title" class="title">
        <a href="url">{{title}}</a>
      </span>
      <span v-if="by" class="by">{{by}}</span>
    </p>
    <p v-html="text"></p>
    <div v-for="kid in visibleKids()" :key="kid">
      <Item :id="kid"/>
    </div>
    <a v-if="descendants > 3 && this.limit" @click="readMore">Read More...</a>
  </fish-segment>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Item',
  props: ['id'],
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
    readMore() {
      this.limit = false;
    },
    visibleKids() {
      return this.limit ? this.kids.slice(0, 3) : this.kids;
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
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments {
  padding: 1em;
}
</style>

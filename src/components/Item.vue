<template>
  <div class="comments">
    <p>{{type === 'story' ? `${score} | ${title} | ` : ''}} {{ this.by }}</p>
    <p v-html="text"></p>
    <div v-for="kid in visibleKids()" :key="kid">
      <Item :id="kid"/>
    </div>
  </div>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Item',
  props: ['id'],
  data() {
    return {
      by: undefined,
      score: undefined,
      parent: undefined,
      kids: [],
      text: undefined,
      time: undefined,
      title: undefined,
      type: undefined,
      url: undefined,
    };
  },
  watch: {
    $route: 'fetchData',
  },
  created() {
    this.fetchData();
  },
  methods: {
    visibleKids() {
      return this.kids.slice(0, 3);
    },
    fetchData() {
      fetchItem(this.id).then((data) => {
        if (data) {
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
  margin: 1em;
}
</style>

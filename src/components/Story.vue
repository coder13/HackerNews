<template>
  <fish-card class="story">
    <div slot="header">
      <span>{{this.title}}</span>
    </div>
    {{this.score}} | {{this.kids.length}} comments
  </fish-card>
</template>

<script>
import { fetchItem } from '../lib/api';

export default {
  name: 'Story',
  props: ['item'],
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
  created() {
    fetchItem(this.item).then((data) => {
      this.by = data.by;
      this.descendants = data.descendants;
      this.score = data.score;
      this.kids = data.kids;
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

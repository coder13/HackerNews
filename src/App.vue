<template>
  <div id="app">
    <fish-row>
      <fish-col type="fixed" :width="500">
        <StoryList></StoryList>
      </fish-col>

      <fish-col type="auto">
        <router-view/>
      </fish-col>
    </fish-row>
  </div>
</template>

<script>
import StoryList from './components/StoryList.vue';

export default {
  name: 'App',
  components: {
    StoryList,
  },
  data() {
    return {
      foo: 'bar',
    };
  },
};
</script>

<style>
html, body {
  background-color: #efefef;
}

.score {
  color: #333;
  font-weight: bold;

}

.score:after {
  content: ' ';
}

.time {
  font-weight: light;
}

.by:after {
  content: ' ';
}

a, a:visited, a:hover {
  color: #AA0000;
}

a:hover {
  text-decoration: underline;
}
</style>

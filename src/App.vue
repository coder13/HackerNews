<template>
  <div id="app">
    <fish-row gutter="1">
      <fish-col type="fixed" :width="300">
        <StoryList></StoryList>
      </fish-col>

      <fish-col type="auto">
        <router-view/>
      </fish-col>
    </fish-row>
  </div>
</template>

<script>
import StoryList from './components/StoryList';

export default {
  name: 'App',
  components: {
    StoryList,
  },
};
</script>

<style>
</style>

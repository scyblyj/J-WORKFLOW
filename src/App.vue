<template>
  <div id="app">
    <j-node-wrap></j-node-wrap>
  </div>
</template>

<script>
import JNodeWrap from "./components/JNodeWrap.vue";

export default {
  name: "app",
  components: {
    JNodeWrap,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100vh;
  text-align: center;
  box-sizing: border-box;
  /* padding: 60px; */
  /* padding: 60px 0 220px 0;
  color: #2c3e50;
  background-color: #f5f5f7; */
}
</style>

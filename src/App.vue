<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Vue } from 'vue-class-component'
export default class App extends Vue {
  // export default Vue.extend({
  // name: 'app'
}
</script>

<style lang="scss">
html {
  font-size: 14px;
}
.form-group {
  .error {
    line-height: 1;
    display: none;
    margin-top: 5px;
  }
}
.field-error {
  .error {
    display: block;
    color: #ff0000;
  }
}
</style>

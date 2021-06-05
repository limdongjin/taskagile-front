<template>
  <div class="logo-wrapper">
    <img class="logo" src="/logo.png" alt="logo">
    <div class="tagline">Open source task management tool</div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component'
export default class Logo extends Vue {
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  text-align: center;
  margin-bottom: 40px;

  .tagline {
    line-height: 180%;
    color: #666;
  }

  .logo {
    max-width: 150px;
    margin: 0 auto;
  }
}
</style>

<template>
  <footer class="footer">
    <span class="copyright">&copy; 2021 TaskAgile</span>
    <ul class="footer-links list-inline float-right">
      <li class="list-inline-item"><a href="#">About</a></li>
      <li class="list-inline-item"><a href="#">Terms of Service</a></li>
      <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
      <li class="list-inline-item"><a href="https://github.com/taskagile/vuejs.spring-boot.mysql" target="_blank">GitHub</a></li>
    </ul>
  </footer>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
export default class PageFooter extends Vue {
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  font-size: 13px;
  color: #666;
  line-height: 40px;
  border-top: 1px solid #ddd;
  margin-top: 50px;

  .list-inline-item {
    margin-right: 10px;
  }

  a {
    color: #666;
  }
}
</style>

<template>
  <div class="container public">
    <div class="row justify-content-center">
      <div class="register-form">
        <!-- logo wrapper -->
        <Logo/>

        <!-- 에러 메세지 -->
        <div v-show="errorMessage" class="alert alert-danger failed">
          {{errorMessage}}
        </div>

        <!-- 회원가입 폼 -->
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="username">사용자 이름</label>
            <input type="text" class="form-control" id="username" placeholder="name" v-model="form.username">
          </div>
          <div class="form-group">
            <label for="emailAddress">이메일</label>
            <input type="email" class="form-control" id="emailAddress" placeholder="user@example.com" v-model="form.emailAddress">
          </div>
          <div class="form-group">
            <label for="password">비밀번호</label>
            <input type="password" class="form-control" id="password" placeholder="password" v-model="form.password">
          </div>

          <button type="submit" class="btn btn-primary btn-block">Create Account</button>
        </form>
      </div>
    </div>
    <footer class="footer">
      <span class="copyright"></span>
      <ul class="footer-links list-inline float-right"></ul>
    </footer>
  </div>
</template>

<script lang="ts">
import registrationService from '@/services/registration/registrationService'
import { Vue, Options } from 'vue-class-component'
import { RegistrationForm, RegistrationFormImpl } from '@/api/RegistrationForm'
import Logo from '@/components/Logo.vue'

@Options({
  components: {
    Logo
  }
})
export default class RegistrationPage extends Vue {
  public form: RegistrationForm = new RegistrationFormImpl()

  public errorMessage: string = ''

  async submitForm (): Promise<void> {
    // [TODO] validate 기능 적용하기, vee-validate
    // [TODO] 잘못된 이메일인 경우 에러메시지를 띄워줘야함
    if (!this.form.validateEmail()) {
      return
    }

    await registrationService.register(this.form)
      .then(() => {
        this.$router.push({ name: 'Login' })
      })
      .catch(error => {
        this.errorMessage = 'Failed to register user. Reason: ' + (error.message ? error.message : 'unknown')
      })
  }
}
</script>

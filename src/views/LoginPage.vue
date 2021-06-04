<template>
  <h1>Login</h1>
  <div class="container public">
    <div class="row justify-content-center">
      <div class="register-form">
        <!-- logo wrapper -->
        <Logo />

        <!-- 에러 메세지 -->
        <div v-show="errorMessages" class="alert alert-danger failed">
          {{errorMessages}}
        </div>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="username">이메일 또는 사용자이름</label>
            <input type="text" class="form-control" id="username" v-model="form.username">
          </div>
          <div class="form-group">
            <label for="password">패스워드</label>
            <input type="text" class="form-control" id="password" v-model="form.password">
          </div>

          <button type="submit" class="btn btn-primary btn-block">Create Account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AuthenticationService from '@/services/authentication'
import Logo from '@/components/Logo.vue'
import { Options, Vue } from 'vue-class-component'
import { AuthForm, AuthFormImpl } from '@/api/AuthForm'

@Options({
  components: {
    Logo
  }
})
export default class LoginPage extends Vue {
  public form: AuthForm = new AuthFormImpl('', '')
  public errorMessages: string = ''

  async submitForm (): Promise<void> {
    if (!await this.isValid()) {
      await this.fail(' :: Not Valid username')
      return
    }
    try {
      const res = await AuthenticationService.auth(this.form)
      await this.success(res)
    } catch (err) {
      await this.fail(err)
    }
  }

  async success (res: any) {
    await this.$router.push({ name: 'Home' })
  }

  async fail (err: any) {
    this.errorMessages = 'Failed to Login' + err
  }

  async isValid (): Promise<boolean> {
    // [TODO] isValid 구현하기
    return true
  }
}
</script>

<style scoped>

</style>

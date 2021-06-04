import { RegistrationForm } from '@/api/RegistrationForm'
import { AuthForm } from '@/api/AuthForm'

export default class AuthenticationService {
  public static async auth (detail: AuthForm) {
    if (detail.username === 'dongjin@gmail.com') {
      return {}
    }
    throw new Error('Not Authorize')
  }
}

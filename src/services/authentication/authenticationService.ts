import { RegistrationForm } from '@/api/RegistrationForm'
import axios from 'axios'
import { AuthForm } from '@/api/AuthForm'

export default class AuthenticationService {
  public static async auth (detail: AuthForm) {
    try {
      const res = await axios.post('/authentications', detail)
      const data = res.data

      return data
    } catch (err) {
      // [TODO] 현재는 상태코드가 500, 400 등으로 오면 모두 같은 에러 객체를 보내고있다. 좀더 개선해보자.
      throw new Error('Not Authorize')
    }
  }
}

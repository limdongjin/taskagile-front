import { UserForm } from '@/api/UserForm'
import axios from 'axios'

export default class AuthenticationService {
  public static async auth (detail: UserForm) {
    try {
      console.log('axios called')
      // axios.create()
      return await axios.post('/authentications')
    } catch (err) {
      // [TODO] 현재는 상태코드가 500, 400 등이 모두 같은 에러 메시지를 보내고있다. 좀더 개선해보자.
      // const status = err.response.status
      // console.log('catch axios')
      // console.log(err.response)
      // let aa: Error = Error()
      // aa.response
      throw new Error('Not Authorize')
    }
  }
}

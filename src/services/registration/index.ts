import { UserForm } from '@/api/UserForm'
import axios from 'axios'

export default {
  register (detail: UserForm) {
    return new Promise((resolve, reject) => {
      console.log('registration service object called')

      axios.post('/registrations', detail).then(({ data }) => {
        resolve(data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }
}

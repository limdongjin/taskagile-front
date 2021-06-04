import { RegistrationForm } from '@/api/RegistrationForm'
import axios from 'axios'

export default {
  register (detail: RegistrationForm) {
    return new Promise((resolve, reject) => {
      axios.post('/registrations', detail).then(({ data }) => {
        resolve(data)
      }).catch((error: any) => {
        reject(error)
      })
    })
  }
}

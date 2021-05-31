import axios from 'axios'
import { Form } from '@/types/Form'

export default {
  register (detail: Form) {
    return new Promise((resolve, reject) => {
      console.log('registration service object called')
      axios.post('/registrations', detail).then(({ data }) => {
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

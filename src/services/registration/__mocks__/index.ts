import { Form } from '@/types/Form'

export default {
  register (detail: Form) {
    return new Promise((resolve, reject) => {
      detail.emailAddress === 'dongjin@example.com'
        ? resolve({ result: 'success' })
        : reject(new Error('User already exist'))
    })
  }
}

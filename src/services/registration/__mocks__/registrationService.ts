// import { UserForm } from '@/../../../../types/UserForm'

export default {
  register (detail: UserForm) {
    return new Promise((resolve, reject) => {
      detail.emailAddress === 'dongjin@example.com'
        ? resolve({ result: 'success' })
        : reject(new Error('User already exist'))
    })
  }
}

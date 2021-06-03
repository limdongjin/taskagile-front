import { UserForm } from '@/../../../../types/UserForm'

export default {
  async register (detail: UserForm) {
    if (detail.username === 'dongjin@example.com' &&
        detail.password === '1q2w3e4r') {
      return { isAuth: true }
    }
    return { isAuth: false }

    // return new Promise((resolve, reject) => {
    //   detail.username === 'dongjin@example.com' &&
    //     detail.password === '1q2w3e4r'
    //     ? resolve({ result: 'success' })
    //     : reject(new Error('Invalid Credentials'))
    // })
  }
}

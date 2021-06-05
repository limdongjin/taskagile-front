// import { UserForm } from '@/../../../../types/UserForm'

import {RegistrationForm} from "@/api/RegistrationForm";

export default {
  register (detail: RegistrationForm) {
    return new Promise((resolve, reject) => {
      detail.emailAddress === 'dongjin@example.com'
        ? resolve({ result: 'success' })
        : reject(new Error('User already exist'))
    })
  }
}

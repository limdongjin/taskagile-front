export interface Form {
  username: string,
  emailAddress: string,
  password: string,
  setForm: (username: string, emailAddress: string, password: string) => Promise<void>,
  validateEmail: () => boolean
}

export class FormImpl implements Form {
  username: string = '';
  emailAddress: string = '';
  password: string = '';

  async setForm (username: string, emailAddress: string, password: string): Promise<void> {
    this.username = username
    this.emailAddress = emailAddress
    this.password = password
  }

  validateEmail () {
    // vee-validate 적용전 임시 함수
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return re.test(this.emailAddress)
  }
}

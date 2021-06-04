// [TODO] 파일 위치 , 파일 이름 변경 하기
export interface RegistrationForm {
  username: string,
  emailAddress: string,
  password: string,
  setForm: (username: string, emailAddress: string, password: string) => Promise<void>,
  validateEmail: () => boolean
}

export class RegistrationFormImpl implements RegistrationForm {
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

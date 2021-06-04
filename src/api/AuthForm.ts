export interface AuthForm {
  username: string,
  password: string
}

export class AuthFormImpl implements AuthForm {
  username: string = ''
  password: string = ''

  constructor (username: string, password: string) {
    this.username = username
    this.password = password
  }
}

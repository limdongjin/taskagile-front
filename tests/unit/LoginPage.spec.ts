import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage.vue'
// import { UserForm } from '@/../../types/UserForm'
import authenticationService from '@/services/authentication'

describe('LoginPage', () => {
  let wrapper: VueWrapper<any>
  let fieldUsername: DOMWrapper<any>
  let fieldPassword: DOMWrapper<any>
  let buttonSubmit: DOMWrapper<any>

  beforeEach(() => {
    wrapper = mount(LoginPage)
    fieldUsername = wrapper.find('#username')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
  })
  it('submitForm() 은 authentication service 를 호출하고 응답에 따라서 적절한 행동을 한다', async () => {
    const submitForm = wrapper.vm.submitForm

    const isValidMock = jest.fn()
    isValidMock.mockReturnValue(true)
    wrapper.vm.isValid = isValidMock

    const authenticationSpy = jest.spyOn(authenticationService, 'auth')
    // @ts-ignore
    authenticationSpy.mockResolvedValue({ isAuth: true })

    const successSpy = jest.spyOn(wrapper.vm, 'success')
    successSpy.mockResolvedValue(0)
    const failSpy = jest.spyOn(wrapper.vm, 'fail')
    failSpy.mockResolvedValue(0)

    // when
    await submitForm()
    await wrapper.vm.$nextTick()

    // then
    expect(isValidMock).toBeCalledTimes(1)
    expect(authenticationSpy).toBeCalledTimes(1)
    expect(successSpy).toBeCalledTimes(1)
    expect(failSpy).toBeCalledTimes(0)
  })
  it('submit 버튼을 누르면 submitForm 메서드가 실행된다. ', async () => {
    const spyFn = jest.spyOn(wrapper.vm, 'submitForm')

    // when
    await buttonSubmit.trigger('submit')

    // then
    expect(spyFn).toBeCalledTimes(1)
  })

  it('Login Page should have some elements', () => {
    expect(wrapper.find('h1').text())
      .toMatch('Login')
    expect(wrapper.find('#logo').attributes().src)
      .toMatch('https://google.com')
    expect(fieldUsername.exists())
      .toBeTruthy()
    expect(fieldPassword.exists())
      .toBeTruthy()
    expect(buttonSubmit)
      .toBeTruthy()
  })
  it('데이터 바인딩이 잘되는지 확인', async () => {
    const username = 'user1'
    // const emailAddress = 'ema2@nav.com'
    const password = '1q2w3e'
    const form: UserForm = wrapper.vm.form

    // when
    await form.setForm(username, '', password)

    // then
    expect(fieldUsername.element.value)
      .toEqual(username)
    expect(fieldPassword.element.value)
      .toEqual(password)
  })
  it('데이터 바인딩 초기값 검증', () => {
    expect(wrapper.vm.form.username)
      .toEqual('')
    expect(wrapper.vm.form.password)
      .toEqual('')
    expect(wrapper.vm.errorMessages)
      .toEqual('')
  })
})

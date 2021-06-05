import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage.vue'
import { RegistrationForm } from '@/api/RegistrationForm'
import AuthenticationService from '@/services/authentication/authenticationService'
jest.mock('@/services/authentication/authenticationService')

describe('LoginPage', () => {
  let wrapper: VueWrapper<any>
  let fieldUsername: DOMWrapper<any>
  let fieldPassword: DOMWrapper<any>
  let buttonSubmit: DOMWrapper<any>
  let authenticationSpy: jest.SpyInstance

  beforeEach(() => {
    wrapper = mount(LoginPage)
    fieldUsername = wrapper.find('#username')
    fieldPassword = wrapper.find('#password')
    buttonSubmit = wrapper.find('form button[type="submit"]')
    authenticationSpy = jest.spyOn(AuthenticationService, 'auth')
  })
  afterEach(() => {
    authenticationSpy.mockReset()
    authenticationSpy.mockRestore()
  })
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('submitForm() 은 authentication service 를 호출하고 응답에 따라서 적절한 행동을 한다', async () => {
    const submitForm = wrapper.vm.submitForm
    const isValidMock = jest.spyOn(wrapper.vm, 'isValid')

    isValidMock.mockReturnValue(true)
    authenticationSpy = jest.spyOn(AuthenticationService, 'auth')
    authenticationSpy.mockResolvedValue(111)

    const successSpy = jest.spyOn(wrapper.vm, 'success')
    successSpy.mockResolvedValue(0)
    const failSpy = jest.spyOn(wrapper.vm, 'fail')

    // when
    await submitForm()
    await wrapper.vm.$nextTick()

    // then
    expect(isValidMock).toBeCalledTimes(1)
    expect(authenticationSpy).toBeCalledTimes(1)
    expect(successSpy).toBeCalledTimes(1)
    expect(failSpy).toBeCalledTimes(0)
  })
  it('submit 버튼을 누르면 submitForm 메서드가 실행되고, auth 서비스 실행 ', async () => {
    const submitFormSpy = jest.spyOn(wrapper.vm, 'submitForm')

    // when
    await buttonSubmit.trigger('submit')

    // then
    expect(submitFormSpy).toBeCalledTimes(1)
    expect(authenticationSpy).toBeCalledTimes(1)
  })

  it('Login Page should have some elements', () => {
    // expect(wrapper.find('h1').text())
    //   .toMatch('Login')
    // expect(wrapper.find('#logo').attributes().src)
    //   .toMatch('/logo.png')
    expect(fieldUsername.exists())
      .toBeTruthy()
    expect(fieldPassword.exists())
      .toBeTruthy()
    expect(buttonSubmit)
      .toBeTruthy()
  })
  it('데이터 바인딩이 잘되는지 확인', async () => {
    const username = 'user1'
    const password = '1q2w3e'
    const form: RegistrationForm = wrapper.vm.form

    // when
    await (async () => {
      form.username = username
      form.emailAddress = ''
      form.password = password
    })()

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

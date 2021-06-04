import 'jest'
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import RegistrationPage from '@/views/RegistrationPage.vue'
import registrationService from '@/services/registration'
import SpyInstance = jest.SpyInstance;
jest.mock('@/services/registration')

describe('RegistrationPage.vue', () => {
  let wrapper: VueWrapper<any>
  let fieldUserName: DOMWrapper<any>
  let fieldPassword: DOMWrapper<any>
  let fieldEmailAddress: DOMWrapper<any>
  let buttonSubmit: DOMWrapper<any>
  let $router: any
  let registerSpy: SpyInstance
  beforeEach(() => {

    registerSpy = jest.spyOn(registrationService, 'register')
    $router = {
      push: jest.fn()
    }
    wrapper = mount(RegistrationPage, {
      global: {
        mocks: {
          $router
        }
      }
    })

    fieldUserName = wrapper.find('#username')
    fieldPassword = wrapper.find('#password')
    fieldEmailAddress = wrapper.find('#emailAddress')
    buttonSubmit = wrapper.find('form button[type="submit"]')
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should fail when the email address is invalid', async () => {
    const spy = jest.spyOn(registrationService, 'register')

    await wrapper.vm.form.setForm('dongjin', 'bad-email', '1q2w')
    await wrapper.vm.submitForm()
    expect(spy).not.toHaveBeenCalled()
  })
  it('should register when it is a new user', async () => {
    const spyFn = jest.spyOn($router, 'push')

    await wrapper.vm.form.setForm('dongjin', 'dongjin@example.com', '1q2w3e')
    await wrapper.vm.submitForm()
    expect(registerSpy).toBeCalled()

    await wrapper.vm.$nextTick(() => {
      expect(spyFn).toHaveBeenCalledWith({ name: 'Login' })
    })
  })
  it('should fail it is not a new user', async () => {
    // given
    const errMsg = 'Failed to register user. Reason: User already exist'
    await wrapper.vm.form.setForm('alreadyUser', 'already@ex.com', '1q2')

    // before submit
    await expect(wrapper.find('.failed').isVisible()).toBeFalsy()

    // when
    await wrapper.vm.submitForm()
    expect(registerSpy).toBeCalled()

    await wrapper.vm.$nextTick()

    // then
    expect(wrapper.vm.errorMessage).toEqual(errMsg)
    expect(wrapper.find('.failed').isVisible()).toBeTruthy()
  })

  it('should contain data model with initial values', () => {
    // 데이터 모델의 초기값을 검증한다.
    expect(wrapper.vm.form.username).toEqual('')
    expect(wrapper.vm.form.emailAddress).toEqual('')
    expect(wrapper.vm.form.password).toEqual('')
  })

  it('should have form inputs bound with data model', async () => {
    // 데이터 모델 바인딩이 잘되었는지 테스트한다.

    // given
    const username = 'user1'
    const emailAddress = 'user1@exam.com'
    const password = '1q2w3e4r!'

    // when
    // 비동기적으로 데이터를 변경하므로 async await 을 걸어서
    // 데이터를 set 하는 로직부터 실행되도록 강제해야한다.
    await wrapper.vm.form.setForm(username, emailAddress, password)

    // then
    expect(fieldUserName.element.value)
      .toEqual(username)
    expect(fieldEmailAddress.element.value)
      .toEqual(emailAddress)
    expect(fieldPassword.element.value)
      .toEqual(password)
  })

  it('should have form submit event handler submitForm', async () => {
    // form submit 을 하면 submitForm 메서드가 실행되는지 검사한다.

    const func = jest.spyOn(wrapper.vm, 'submitForm')

    // when
    await buttonSubmit.trigger('submit')

    // then
    expect(func).toBeCalledTimes(1)
  })

  it('should render correct contents', () => {
    expect(wrapper.find('#logo').attributes().src)
      .toMatch('https://google.com')

    expect(wrapper.find('.tagline').text())
      .toEqual('Open source task management tool')

    expect(fieldUserName.element.value)
      .toEqual('')

    expect(fieldEmailAddress.element.value)
      .toEqual('')

    expect(fieldPassword.element.value)
      .toEqual('')

    expect(buttonSubmit.text())
      .toEqual('Create Account')
  })
})

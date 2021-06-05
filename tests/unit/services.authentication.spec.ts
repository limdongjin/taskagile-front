import moxios from 'moxios'
import authenticationService from '@/services/authentication/authenticationService'
import { RegistrationForm, RegistrationFormImpl } from '@/api/RegistrationForm'

describe('services/authentication', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('성공 했을때 응답', () => {
    const stub = new RegistrationFormImpl()
    moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      expect(req.url).toEqual('/authentications')
      req.respondWith({
        status: 200,
        response: { message: 'success' }
      })
    })
    return authenticationService.auth(stub)
      .then((data) => {
        expect(data.message)
          .toEqual('success')
      })
  })
  it('/authentications 를 호출한다.', () => {
    const stub = new RegistrationFormImpl()
    moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      expect(req.url).toEqual('/authentications')
      req.respondWith({
        status: 200,
        response: { message: 'success' }
      })
    })

    return authenticationService.auth(stub)
  })
  it('401 상태코드가 응답으로 오면, 에러를 반환한다. ', async () => {
    const stub: RegistrationForm = new RegistrationFormImpl()
    moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      expect(req).toBeTruthy()
      req.respondWith({
        status: 401,
        response: { message: 'success' }
      })
    })

    await authenticationService.auth(stub)
      .then(() => {
        expect(true).toBeFalsy()
      }).catch((err: Error) => {
        expect(err.message)
          .toEqual('Not Authorize')
      })
  })
})

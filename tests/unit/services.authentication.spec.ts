import moxios from 'moxios'
import authenticationService from '@/services/authentication'
import { UserForm, FormImpl } from '@/api/UserForm'

describe('services/authentication', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('401 상태코드가 응답으로 오면, 에러를 반환한다. ', async () => {
    const stub: UserForm = new FormImpl()
    moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      expect(req).toBeTruthy()
      req.respondWith({
        status: 401,
        // @ts-ignore
        user: {
          username: 'user1',
          email: 'us@gmail.com'
        }
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

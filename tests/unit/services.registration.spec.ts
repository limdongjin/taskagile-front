import moxios from 'moxios'
import registrationService from '@/services/registration'
import { FormImpl, UserForm } from '@/api/UserForm'

describe('services/registration', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('should pass the response to caller when request succeeded', async () => {
    expect.assertions(2)

    const stub: UserForm = new FormImpl()
    await moxios.wait(() => {
      const req = moxios.requests.mostRecent()
      expect(req).toBeTruthy()

      req.respondWith({
        status: 200,
        response: {
          result: 'success'
        }
      })
    })

    return registrationService.register(stub).then(data => {
      // @ts-ignore
      expect(data.result).toEqual('success')
    })
  })
})

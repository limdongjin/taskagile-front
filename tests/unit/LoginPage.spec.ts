import { shallowMount } from '@vue/test-utils'
import LoginPage from '@/views/LoginPage.vue'

describe('LoginPage', () => {
  it('Login Page should have h1 tag', () => {
    const h1Content = 'Login Page'
    const wrapper = shallowMount(LoginPage)
    expect(wrapper.find('h2').exists()).toBeFalsy()

    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('h1').text()).toMatch(h1Content)
  })
})

module.exports = {
  'login test': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + 'login')
      .waitForElementVisible('#app', 5000)
      .assert.containsText('h1', 'Login Page')
      .end()
      // .waitForElementVisible('#app', 5000)
  }
}

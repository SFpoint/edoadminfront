export const formatLogin = (login) => {
    if (login.includes('@')) return login.trim();
    let phoneTest = login.match(/\d/g)
    if (!phoneTest) return login.trim();
    if (phoneTest.length < 10 || phoneTest.length > 11) return login.trim();
    if (phoneTest.length === 10) {
        phoneTest.unshift('7')
    } else {
        phoneTest.shift()
        phoneTest.unshift('7')
    }
    return phoneTest.join('')
  }
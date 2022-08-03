import { repository } from "@/api/base"

export default {
  async login(body) {
    const { data } = await repository.post('/auth/login', body)
    return data
  },

  async getCurrent() {
    const { data } = await repository.get('/auth/identity')
    return data
  },

  async logout() {
    return await repository.post('/auth/logout')
  },

  async startRegistration(body) {
    return await repository.post('/auth/register', { username: body })
  },

  async confirmRegistration(body) {
    return await repository.post('/auth/register/confirm', body)
  },

  async startReset(body) {
    return await repository.post('/auth/reset', { username: body })
  },

  async confirmReset(body) {
    return await repository.post('/auth/reset/confirm', body)
  },

  async checkCode(body) {
    return await repository.post('/auth/check', body)
  }
}
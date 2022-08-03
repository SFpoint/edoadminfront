import { vm } from '@/main'
import axios from 'axios'
import router from "@/router"
import store from "@/store"

export const repository = axios.create()
export const baseURL = '/api'
export const fiasURL = '/fias-search'

const redirectToLogin = async () => {
  await store.dispatch('timer/clearInterval')
  await store.dispatch('user/logout')
  await router.replace({ path: '/login' })
  vm.$toastr('warning', '', 'Время сессии истекло')
}

repository.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    router.app._route.name !== 'login' && redirectToLogin()
  }
  return Promise.reject(error.response)
})
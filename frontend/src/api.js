import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 12000 })
api.interceptors.request.use(config => {
  const token = localStorage.getItem('eb_access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use(r=>r, async error => {
  const original = error.config
  if (error.response?.status === 401 && !original?._retry) {
    const refresh = localStorage.getItem('eb_refresh')
    if (refresh) {
      original._retry = true
      try {
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/token/refresh/`, {refresh})
        localStorage.setItem('eb_access', data.access)
        if (data.refresh) localStorage.setItem('eb_refresh', data.refresh)
        original.headers.Authorization = `Bearer ${data.access}`
        return api(original)
      } catch { localStorage.removeItem('eb_access'); localStorage.removeItem('eb_refresh') }
    }
  }
  return Promise.reject(error)
})
export const unwrap = d => Array.isArray(d) ? d : (d?.results || [])
export default api

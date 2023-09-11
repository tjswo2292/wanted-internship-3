import { PATH } from './constants'
import { apiInstance } from './core'

export const publicApi = {
  GET: async () => {
    const response = await apiInstance.get(`${PATH.REGION}`)
    return response
  },
}

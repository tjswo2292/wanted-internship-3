import axios from 'axios'

const URL = 'http://localhost:5000'

export const apiInstance = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

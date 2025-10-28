import axios from 'axios'
const baseUrl = '/api/login'

const login = (input) => {
  const request = axios.post(baseUrl, input)
  return request.then(response => response.data)
}

export default { login }
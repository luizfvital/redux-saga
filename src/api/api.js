import axios from 'axios'

const axiosApi = axios.create({
  baseURL: 'http://localhost:3001',
})

const getUsers = () => axiosApi.get('/users')

const createUser = ({firstName, lastName}) =>
  axiosApi.post('/users', {
    firstName,
    lastName,
  })

const deleteUser = (userId) => axiosApi.delete(`/users/${userId}`)

const api = {
  getUsers,
  createUser,
  deleteUser,
}

export default api

import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async() => {
  const response = await axios.get(baseUrl) 
  return response.data
}

const create = async (newBlog, token) => {
  
  const response = await axios.post(
    baseUrl, 
    newBlog, 
    {headers:{Authorization: token}}
  )
  return response.data
}

const like = async(blogToLike, token) => {
  
  const reqBody = {...blogToLike, likes:blogToLike.likes+1}
  
  const response = await axios.put(
    `${baseUrl}/${blogToLike.id}`,
    reqBody,
    {headers:{Authorization: token}}
  )
  return response.data
}

const remove = async (blogToRemove, token) => {
  
  const response = await axios.delete(
    `${baseUrl}/${blogToRemove.id}`,
    {headers:{Authorization: token}}
  )
  return response.data

}

export default { getAll, create, like, remove }
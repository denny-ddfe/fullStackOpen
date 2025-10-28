import axios from 'axios'
const baseUrl = '/api/blogs'

let currentToken

const setToken = (newToken) => {
  currentToken = `Bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl) 
  return response.data
}

const create = async (newBlog) => {
  
  const response = await axios.post(
    baseUrl, 
    newBlog, 
    {headers:{Authorization: currentToken}}
  )
  return response.data
}

const like = async(blogToLike) => {
  
  const reqBody = {...blogToLike, likes:blogToLike.likes+1}
  
  const response = await axios.put(
    `${baseUrl}/${blogToLike.id}`,
    reqBody,
    {headers:{Authorization: currentToken}}
  )
  return response.data
}

const remove = async (blogToRemove) => {
  
  const response = await axios.delete(
    `${baseUrl}/${blogToRemove.id}`,
    {headers:{Authorization: currentToken}}
  )
  return response.data

}

export default {  setToken, getAll, create, like, remove }
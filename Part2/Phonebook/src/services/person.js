import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
  	.then(response => response.data)
}

const create = newObject => {
	return axios.post(baseUrl, newObject)
		.then(response => response.data)
}

const remove = removedObject => {
	return axios.delete(`${baseUrl}/${removedObject.id}`)
		.then (()=>{})
}

const update = updatedObject => {
	return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
		.then(response=>response.data)
}


export default {getAll, create, remove, update}
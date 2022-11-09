import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const create = nameObject =>{
    return axios.post(baseUrl, nameObject)
}

const  getAll = () =>{
    return axios.get(baseUrl)
}


const deleteNumber = (id) =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const replace = (id, newNumber) =>{
    return axios.put(`${baseUrl}/${id}`, newNumber)
}




export default{
    create: create,
    getAll: getAll,
    deleteNumber: deleteNumber,
    replace: replace
}
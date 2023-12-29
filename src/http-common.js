import Axios from 'axios';

const createAxios = Axios.create({
    baseURL: "http://localhost:5277"
})

export default createAxios;
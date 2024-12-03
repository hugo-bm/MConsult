import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3830"
})

export default api;
import axios from "axios";

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});
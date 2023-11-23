import axios from 'axios';
const instance = axios.create({
	baseURL: 'http://localhost:3500',
	withCredentials: true,
});

export default instance;

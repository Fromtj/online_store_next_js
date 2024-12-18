import axios from 'axios'

export const axiosRequest = axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_URL,
})

axiosRequest.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('access_token')
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
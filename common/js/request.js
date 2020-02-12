import Vue from 'vue'
import $store from '@/store'
import uni_request from './uni_request.js'

const host = 'https://yinchengnuo.com'
const port = 443
const url = '/dwbsapp'

const request = uni_request({
	timeout: 12345,
	baseURL: `${host}:${port}${url}`
})

request.interceptors.request.use(async config => {
	await new Promise(resolve => setTimeout(() => resolve(), 1234))
	config.header.Authorization = 'Bearer ' + $store.state.app.token
	config.body.test = 'test'
	return config
})

request.interceptors.response.use((response, ...args) => { // 拦截器
	uni.$emit('HIDELOADING') // 隐藏加载
	uni.stopPullDownRefresh() // 停止下拉刷新
	if (response.statusCode === 200) {
		// Vue.prototype.$toast(`${response.statusCode}:${args[1]}`)
	} else { // 服务器响应不为 200 的统一处理方法
		console.log(134)
	}
	return response
})

request.interceptors.response.use(async (response, ...args) => { // 拦截器
	await new Promise(resolve => setTimeout(() => resolve(), 3456))
	return response
})

request.onerror =  async (...args) => { // 请求失败统一处理方法
	console.log('onerror', args)
}

export default request
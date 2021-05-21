/**axios封装
  * 请求拦截、相应拦截、错误统一处理
  */
import axios from 'axios';
import QS from 'qs';
import store from '../store'
import Router from '@/router/index'
import { Message } from 'element-ui';

// import { getToken, setToken, removeToken } from '@/utils/auth'


// 环境的切换
if (process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
	axios.defaults.crossDomain = true;
}

//让ajax携带cookie
axios.defaults.withCredentials = true;
// 请求超时时间
axios.defaults.timeout = 20000;


// 请求拦截器
axios.interceptors.request.use(
	config => {
		// const token = getToken();
		// token && (config.headers.token= token);
		return config;
	},
	error => {
		return Promise.error(error);
	}
)

// 响应拦截器
axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况
	error => { 
		if (error.message.includes('timeout')) {
			Message.error('网络超时');
			return Promise.reject(error);
		}
		if (error.response.status) {
			switch (error.response.status) {
				case 404:
					Message.error('404,网络请求不存在');
					break;
				case 500:
					Message.error('500,服务器端错误');
				  break;
				//其他错误，直接抛出错误提示
				default:
					Message.error(res.data.msg || "Error" )
			}
			return Promise.reject(error.response);
		}
	}
);

let timer = new Date().getTime().toString();
/**
  * get方法，对应get请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function GET(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url + `?t=${timer}`, { //随机数 针对IE设置 不然会有缓存
			params: params
		})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err)
			})
	});
}
/**
  * post方法，对应post请求
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function POST(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err)
			})
	});
}
/**
  * post方法，对应post请求, form-data
  * @param {String} url [请求的url地址]
  * @param {Object} params [请求时携带的参数]
  */
export function FILE(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, QS.stringify(params), {
			headers: {
				'Content-Type': 'multipart/form-data;charset=UTF-8'
			}
		})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err)
			})
	});
}






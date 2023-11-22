import axios, { AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios"
console.log(import.meta.env)
const config: CreateAxiosDefaults = {
    baseURL: import.meta.env.VITE_API_BASE, // 域名配置，可添加变量配置文件定义
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    withCredentials: false, // 跨域请求时是否需要使用凭证
    timeout: 30000, // 请求超时时间
}

// 请求成功处理函数
const requestSuccessHandle = (config: InternalAxiosRequestConfig) => {
    return config;
}

// 请求失败处理函数
const requestFailureHandle = (error: any) => {
    return error;
}

// 响应成功处理函数
const responseSuccessHandle = (response: AxiosResponse) => {
    // todo 
    return response
}

// 响应错误处理函数
const responseFailureHandle = (response: AxiosResponse) => {
    switch (response.status) {
        case 400:
            // 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
            // return Promise.resolve(error)
            break;
        case 401:
            //
            break;
        case 404:
            //
            break;
        // ...
        default:
            throw new Error("未知错误");
    }
}


const instance = axios.create(config);

instance.interceptors.request.use(requestSuccessHandle, requestFailureHandle);

instance.interceptors.response.use(responseSuccessHandle, responseFailureHandle);

export default instance;

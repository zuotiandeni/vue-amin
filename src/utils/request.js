import axios from "axios";

// 创建axios，赋给变量service
// 手把手撸码前段API，地址 http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi"
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求之前做什么
    return config;
  },
  error => {
    // 对请求错误做什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做什么
    return response;
  },
  error => {
    // 对响应错误做什么
    return Promise.reject(error);
  }
);

export default service;
// 使用export default不能声明多个，文件import时不需要使用{}

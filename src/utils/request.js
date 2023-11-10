import axios from "axios";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const baseURL = process.env.VUE_APP_BASE_API;

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: baseURL,
  // 超时
  timeout: 300000,
});

// 异常拦截处理器
const errorHandler = async (error) => {
  console.warn(error);
};

// request拦截器
service.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use((success) => {
  return success.data;
});

export default service;

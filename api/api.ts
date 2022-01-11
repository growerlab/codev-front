import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toaster } from "evergreen-ui";
import { Message } from "./common/notice";

const baseUrl = 'http://localhost:8081/api/v1/';

export const API = {
  Login: '/auth/login',
}

/**
 * 封装axios的请求
 * @returns {AxiosInstance}
 */
export const request = function (): AxiosInstance {
  let instance = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
    headers: {
      'Content-Type': 'application/json',
    },
    validateStatus: function (status: number): boolean {
      return status >= 200 && status < 300;
    },
  });

  instance.interceptors.response.use((response: AxiosResponse) => {
    const status = response.status;

    if (status >= 300 || status < 200) {
      Message.Error(response.data.message);
      return Promise.reject(response);
    }

  }, (error: any) => {
    Message.Error(error.message);
    return Promise.reject(error)
  })

  return instance
}
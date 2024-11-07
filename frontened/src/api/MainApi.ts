import axios, { Axios, AxiosRequestConfig } from 'axios' // 추가
import { APIResponse } from '../types/response'
import { handleError } from "../Handler/ErrorHandler"

// axios 인스턴스 생성
const client: Axios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

//TODO: GET 메서드
export const getData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error();
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error();
  }
};

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: T, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error();
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> => {
  try {
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
    throw new Error();
  }
};
import axios, { Axios, AxiosRequestConfig } from 'axios' // 추가
import { handleError } from "../Handler/ErrorHandler"
import { getNewConfig } from "../Handler/TokenHandler"

// axios 인스턴스 생성
const client: Axios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
})

//TODO: GET 메서드
export const getData = async <T>(url: string): Promise<APIResponse<T>> => {
  try {
    const newConfig: AxiosRequestConfig = getNewConfig();
    const response = await client.get<APIResponse<T>>(url, newConfig);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as unknown as APIResponse<T>;
  }
};

//TODO: POST 메서드
export const postData = async <T>(url: string, data?: any): Promise<APIResponse<T>> => {
  try {
    const newConfig: AxiosRequestConfig = getNewConfig();
    const response = await client.post<APIResponse<T>>(url, data, newConfig);
    return response.data;
  } catch (error) {    
    handleError(error);
    return null as unknown as APIResponse<T>;
  }
};

//TODO: PUT 메서드
export const putData = async <T>(url: string, data?: any): Promise<APIResponse<T>> => {
  try {
    const newConfig: AxiosRequestConfig = getNewConfig();
    const response = await client.put<APIResponse<T>>(url, data, newConfig);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as unknown as APIResponse<T>;
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(url: string): Promise<APIResponse<T>> => {
  try {
    const newConfig: AxiosRequestConfig = getNewConfig();
    const response = await client.delete<APIResponse<T>>(url, newConfig);
    return response.data;
  } catch (error) {
    handleError(error);
    return null as unknown as APIResponse<T>;
  }
};

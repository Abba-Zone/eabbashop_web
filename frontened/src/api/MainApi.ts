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

export const getTestData = async (): Promise<APIResponse<testuser[]>> => {
  var result :testuser[] = [
      {firstName: '현태1', lastName:'전1', email:'jht043@naver.com1', phone:'010-9416-7342-1',},
      {firstName: '현태2', lastName:'전2', email:'jht043@naver.com2', phone:'010-9416-7342-2',},
      {firstName: '현태3', lastName:'전3', email:'jht043@naver.com3', phone:'010-9416-7342-3',},
      {firstName: '현태4', lastName:'전4', email:'jht043@naver.com4', phone:'010-9416-7342-4',}
  ];
  var real_result:APIResponse<testuser[]> = {
    statusCode: 100, // 상태코드 (보인 서버상태코드)
    errorCode: 200, // 에러코드 (본인 서버에러코드)
    message: '굳', // 메시지
    result: result, // 데이터 내용
    timestamp: new Date()// 시간
  };
  return real_result;
};
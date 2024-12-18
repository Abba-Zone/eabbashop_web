import { AxiosRequestConfig } from 'axios' // 추가
/*config에 access토큰 설정*/
export const getNewConfig = (): AxiosRequestConfig => {
    const accessToken = localStorage.getItem("access-token");
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return config;
  }

/*호출에서 생긴 response로 acccess토큰와 refresh토큰 수정 */
export const updateAccessTokenAxios = (newAccessToken:string, newRefreshToken:string) =>{
    localStorage.setItem("access-token", newAccessToken);
    localStorage.setItem("refresh-token", newRefreshToken);
  }

export const updateEmailAuthCode = (authCode:string) => {
    localStorage.setItem("email-auth-code", authCode);
}
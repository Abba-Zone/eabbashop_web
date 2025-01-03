import Cookies from 'js-cookie';

import { AxiosRequestConfig } from 'axios' // 추가
/*config에 access토큰 설정*/
export const getNewConfig = (): AxiosRequestConfig => {
    const accessToken = Cookies.get("access-token");
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return config;
  }

// 쿠키에 토큰 저장하기
export const updateAccessTokenAxios = (newAccessToken: string, newRefreshToken: string) => {
  Cookies.set('access-token', newAccessToken, { secure: true, sameSite: 'Strict' });
  Cookies.set('refresh-token', newRefreshToken, { secure: true, sameSite: 'Strict' });
};

// 사용자 정보 업데이트 함수
export const updateUserInfo = (newFirstName: string, newLastName: string, newRole: string) => {
  Cookies.set('first-name', newFirstName, { secure: true, sameSite: 'Strict' });
  Cookies.set('last-name', newLastName, { secure: true, sameSite: 'Strict' });
  Cookies.set('role', newRole, { secure: true, sameSite: 'Strict' });
};
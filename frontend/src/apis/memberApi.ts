import { getData, postData, getTestData} from './mainApi'
import { updateAccessTokenAxios, updateUserInfo } from "../handlers/tokenHandler"
import { AxiosResponse } from 'axios';
import { dropAuthIDList, insertAuthIDList } from '../handlers/AuthHandler';

const Cookies = require('js-cookie');
/* 데이터 불러오기*/
export const login = async (loginUser: emailAndPassword): Promise<loginSuccess> => {
  try {
    const data: AxiosResponse<loginSuccess> = await postData<loginSuccess>('member/login', loginUser);
    if (data.status === 200) { 
      alert('로그인 성공');
      updateAccessTokenAxios(data.data.accessToken, data.data.refreshToken);
      updateUserInfo(data.data.firstName, data.data.lastName, data.data.role);
      insertAuthIDList(data.data.authIDList);
      return data.data; 
    }
    return null as unknown as loginSuccess; // 로그인 실패
  } catch (error) {
    console.error('Login error:', error);
    return null as unknown as loginSuccess; // 오류 발생 시 false 반환
  }
};

export const signup = async (signupUser: signupUser): Promise<boolean> => {
  try {
    const data = await postData<loginSuccess>('member/signup', signupUser);
    if (data) {
      updateAccessTokenAxios(data.data.accessToken, data.data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

export const isEmailValid = (email:string):boolean => {
    postData<boolean>('member/email/check', email)
        .then((data:AxiosResponse<boolean>) => {
            return data;
        }
    );
    return false;
}

export const authEmail = async (email: string): Promise<string> => {
    try {
        const data:AxiosResponse<authEmail> = await postData<authEmail>('member/email/auth', email);
        return data.data.code; // 성공적으로 인증번호가 발송되면 반환
    } catch (error) {
        console.error('Email authentication error:', error);
        return ''; // 실패 시 빈 문자열 반환
    }
};

export const checkAuthCode = async (email: string, code: string): Promise<{ status: number, isValid: boolean }> => {
  try {
    const response = await postData<{ isValid: boolean }>('member/email/code', { email, code });
    const reponseStatus = response.status;
    if (reponseStatus === 216) {
      return { status: 216, isValid: false }; // 인증 코드 만료
    }
    return { status: 200, isValid: response.data.isValid }; // 성공적인 응답
  } catch (error: any) {
    console.error('Error verifying auth code:', error);
    return { status: 500, isValid: false }; // 기타 오류
  }
};

export const checkRecommendEmail = async (email: string): Promise<{ status: number}> => {
  try {
    const response = await getData<{ message: string }>(`/member/email/check?email=${email}`);
    const reponseStatus = response.status;
    return { status: reponseStatus };
  } catch (error) {
    console.error('Error checking recommend email:', error);
    return { status: 500 };
  }
};

export const changeRecommendEmail = async (referID: string, referredID: string): Promise<boolean> => {
  try {
    const response = await postData('/member/update/change', { referID, referredID });
    return response.status === 200;
  } catch (error) {
    console.error('Error changing recommend email:', error);
    return false;
  }
}

export const changeRole = (memberidAndRole:memberIDAndRole) => {
    postData('/role/update', memberidAndRole).then(() => {});
}

export const logout = () =>{
    postData('/logout')
        .then(() => {
            updateAccessTokenAxios(null as unknown as string,null as unknown as string);
            dropAuthIDList();
        }
    );
}

export const getMemberList = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string):Promise<memberList> => {
    /* real code*/
    try {
      const response = await getData<memberList>(
          `/member/list?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&sortValue=${sortValue}&filter=${filter}&filterValue=${filterValue}`
      );
      return response.data;
  } catch (error) {
      console.error('Error fetching board list:', error);
      throw error;
  }

    /* make for test*/
    var result :memberList = {
        totalCount : 10003,
        list:[]
    };
    return result;
}

export const getMemberDetail = async(memberID:string):Promise<memberDetailInfo> => {
  try {
    const response = await getData<memberDetailInfo>(
     '/member/detail/'+ memberID
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching board detail:', error);
    throw error;
  }
}

export const getMemberDetailMe = async (): Promise<memberDetailInfo> => {
    const response = await getData<memberDetailInfo>('member/detail/me');
    return response.data as memberDetailInfo;
}

export const updateInfo = (updateInfo:updateInfo) => {
    postData('/info/update', updateInfo).then(() => {});
}

export const changePassword = (changeInfo:emailAndPassword) => {
    postData('/password/update', changeInfo);
}

export const withdraw = () => {
    postData('/withdraw').then(() => {});
}
export const getUserList = async (): Promise<testuser[]> => {
    const data: APIResponse<testuser[]> = await getTestData();
    return data.result; // 비동기 결과를 반환
  };

export const googleLogin = async (): Promise<loginSuccess> => {
  const googleOauthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID_PROD;
  
  if (!googleOauthClientId) {
    throw new Error('Google OAuth Client ID is not defined');
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: googleOauthClientId,
    redirect_uri: "http://localhost:3000/code/google",
    scope: "email profile"
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  window.location.href = googleAuthUrl;
  
  return null as unknown as loginSuccess;
};

export const googleLoginWithCode = async (code: string): Promise<loginSuccess | null> => {
  try {
    const response = await postData<loginSuccess>('member/oauth/google/code', { code });
    if (response.status === 200) {
      updateAccessTokenAxios(response.data.accessToken, response.data.refreshToken);
      updateUserInfo(response.data.firstName, response.data.lastName, response.data.role);
      return response.data;
    } else if (response.status === 201) {
      alert('신규회원입니다.');
      const { email, password, firstName, lastName, provider } = response.data.response;
      Cookies.set('signupData', JSON.stringify({ email, password, firstName, lastName, provider }));
      window.location.href = '/socialsignup';
    }
    return null;
  } catch (error) {
    console.error('Google login error:', error);
    return null;
  }
};

export const kakaoLoginWithCode = async (code: string): Promise<loginSuccess | null> => {
    try {
        const response = await postData<loginSuccess>('member/oauth/kakao/code', { code });
        console.log(response);
        if (response.status === 200) {
            updateAccessTokenAxios(response.data.accessToken, response.data.refreshToken);
            updateUserInfo(' ', response.data.lastName, response.data.role);
            return response.data;
        } else if (response.status === 201) {
            alert('신규회원입니다.');
            const { email, password, firstName, lastName, provider } = response.data.response;
            Cookies.set('signupData', JSON.stringify({ email, password, firstName, lastName, provider }));
            window.location.href = '/socialsignup';
        }
        return null;
    } catch (error) {
        console.error('Kakao login error:', error);
        return null;
    }
};

export const findID = async (findIDParam:findIDParam): Promise<findIDResult | null> => {
  try {
    const response = await postData<findIDResult>('member/find', findIDParam);
    return response.data;
  } catch (error) {
    console.error('Find ID error:', error);
    return null;
  }
}

export const requestAdmin = async (WantRole: string, RefferedID: string): Promise<boolean> => {
  try {
    const response = await postData('/registeradmin/request', { WantRole, RefferedID });
    return response.status === 200;
  } catch (error) {
    console.error('Request admin error:', error);
    return false;
  }
}


export const requestAdminAuto = async (refferedID: string): Promise<boolean> => {
  try {
    const response = await postData('/registeradmin/requestAuto', { refferedID });
    return response.status === 200;
  } catch (error) {
    console.error('Request admin auto error:', error);
    return false;
  }
}

export const requestAdminList = async (): Promise<requestAdminRegistList> => {
    try {
        const response = await getData('/registeradmin/request/list');
        return response.data as requestAdminRegistList;
    } catch (error) {
        console.error('Request admin list error:', error);
        return null as unknown as requestAdminRegistList;
    }
}

export const requestAdminListAll = async (): Promise<requestAdminRegistList> => {
  try {
      const response = await getData('/registeradmin/request/list/all');
      return response.data as requestAdminRegistList;
  } catch (error) {
      console.error('Request admin list all error:', error);
      return null as unknown as requestAdminRegistList;
  }
}

export const requestAdminResult = async (Changerequestid: string, Status: string): Promise<boolean> => {
  try {
    const response = await postData('/registeradmin/result', { Changerequestid, Status });
    return response.status === 200;
  } catch (error) {
    console.error('Request admin update error:', error);  
    return false;
  }
}

export const updateRole = async (memberID:string, role:string): Promise<boolean> => {
  try {
    const response = await postData('member/update/role', { memberID, role });
    return response.status === 200;
  } catch (error) {
    console.error('Update role error:', error);
    return false;
  }
}

export const updateRecommendEmail = async (recommendEmail: string): Promise<boolean> => {
  try {
    const response = await postData('member/update/recommend', { recommendEmail });
    return response.status === 200;
  } catch (error) {
    console.error('Update recommend email error:', error);
    return false;
  }
}

export const getSellerInfo = async (sellerID:string):Promise<productSeller> => {
  try {
      const response = await getData<productSeller>(
          '/member/seller/detail?sellerID='+ sellerID
      );
      return response.data;
  } catch (error) {
      console.error('Error fetching product seller detail:', error);
      throw error;
  }
}

export const updateUserData = async (userInfo: userInfo): Promise<boolean> => {
  try {
    const response = await postData('member/update', userInfo);
    return response.status === 200;
  } catch (error) {
    console.error('Update user data error:', error);
    return false;
  }
}

export const updatePassword = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await postData('member/update/password', { email, password });
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error('Update password error:', error);
    return false;
  }
}

export const sendResetPasswordEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await postData('/member/email/password', { email });
    return response.status === 200;
  } catch (error) {
    console.error('Send reset password email error:', error);
    return false;
  }
}

export const getLineList = async (): Promise<lineList> => {
  try {
    const response = await getData('/member/recommend/list/line');
    console.log("getLineList", response);
    return response.data as lineList;
  } catch (error) {
    console.error('Get line list error:', error);
    return null as unknown as lineList;
  }
}
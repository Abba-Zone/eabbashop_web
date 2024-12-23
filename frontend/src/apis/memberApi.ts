import { getData, postData, getTestData} from './mainApi'
import { updateAccessTokenAxios } from "../handlers/tokenHandler"
import { AxiosResponse } from 'axios';
import { convertToObject } from 'typescript';
/* 데이터 불러오기*/
export const login = (loginUser:emailAndPassword):boolean => {
    postData<loginSuccess>('/login', loginUser)
        .then((data:AxiosResponse<loginSuccess>) => {
            if(data == null) //로그인 실패
                return false;
            else{ //로그인 성공
                updateAccessTokenAxios(data.data.access_token, data.data.refresh_token);
                return true;
            }
        }
    );
    return false;
};

export const signup = async (signupUser: signupUser): Promise<boolean> => {
  try {
    const data = await postData<loginSuccess>('member/signup', signupUser);
    if (data) {
      console.log(data);
      updateAccessTokenAxios(data.data.access_token, data.data.refresh_token);
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

export const checkRecommendEmail = async (email: string): Promise<string> => {
  try {
    const response = await getData<{ message: string }>(`/member/email/check?email=${email}`);
    // console.log(response);
    return response.data.message; // 서버로부터의 메시지를 반환
  } catch (error) {
    console.error('Error checking recommend email:', error);
    return '유효하지 않은 추천인 이름입니다.'; // 오류 발생 시 메시지 반환
  }
};

export const changeRole = (memberidAndRole:memberIDAndRole) => {
    postData('/role/update', memberidAndRole).then(() => {});
}

export const logout = () =>{
    postData('/logout')
        .then(() => {
            updateAccessTokenAxios(null as unknown as string,null as unknown as string);
        }
    );
}

export const getMemberList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):memberList => {
    /* real code*/
    // getData<memberList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<memberList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as memberList;

    /* make for test*/
    var result :memberList = {
        totalCount : 10003,
        list:[
            {memberID: '1sasfdgsdfgs', name:'전 현태1', email:'jht043@naver.com1', phone:'010-9416-7342-1', role:'대리점', grade:'silver', recommend:'ych526@naver.com', platform:'net', createdDateTime:'2023-11-28 15:12:44'},
            {memberID: '2sasfdgsdfgs', name:'전 현태2', email:'jht043@naver.com2', phone:'010-9416-7342-2', role:'대리점', grade:'silver', recommend:'ych526@naver.com', platform:'net', createdDateTime:'2023-11-28 15:12:44'},
            {memberID: '3sasfdgsdfgs', name:'전 현태3', email:'jht043@naver.com3', phone:'010-9416-7342-3', role:'대리점', grade:'silver', recommend:'ych526@naver.com', platform:'net', createdDateTime:'2023-11-28 15:12:44'},
            {memberID: '4sasfdgsdfgs', name:'전 현태4', email:'jht043@naver.com4', phone:'010-9416-7342-4', role:'대리점', grade:'silver', recommend:'ych526@naver.com', platform:'zon', createdDateTime:'2023-11-28 15:12:44'},
            {memberID: '5sasfdgsdfgs', name:'전 현태5', email:'jht043@naver.com5', phone:'010-9416-7342-5', role:'대리점', grade:'silver', recommend:'ych526@naver.com', platform:'zon', createdDateTime:'2023-11-28 15:12:44'},
        ]
    };
    return result;
}

export const getMemberDetail = (memberID:string):memberDetailInfo => {
    // getData<memberDetailInfo>('/info?MemberID='+ memberID)
    //     .then((data:APIResponse<memberDetailInfo>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as memberDetailInfo;
    
    var result:memberDetailInfo= {
        memberInfo:{
          memberID : "1q2w3er4t5t",
          email : "rudgns9334",
          name : "정경훈",
          role : "판매점",
          recommend : "ych526@naver.com",
          phone : "010-9334-1487",
          grade : "VVVVVVVVVVVVVVS",
          createdDateTime : "2024-11-15 16:30:22",
          country : "KOR",
          lastLoginTime:"2024-11-15 16:30:22",
          platform:"zone",
        },
        wallet :{
          AK : 1.0,
          AP : 1.0,
          SP : 1.0,
          AW : 1.0,
          ABZ : 1.0,
        },
        address : [
            {
                country : "KOR",
                zipCode : "11111",
                baseAddress : "부산시 기장군",
                detailAddress : "파란하늘집",
                isMain : true,
                isBill : true,
                host : "정경훈",
                phone : "010-1234-5678",
                name : "우리집",
                comment : "문앞에두지말고경비원옆에두지말고널판"
           },
           {
                country : "KOR5",
                zipCode : "111115",
                baseAddress : "부산시 기장군5",
                detailAddress : "파란하늘집5",
                isMain : false,
                isBill : false,
                host : "정경훈5",
                phone : "010-1234-56785",
                name : "우리집5",
                comment : "문앞에두지말고경비원옆에두지말고널판5"
          }
        ],
        // seller:null as unknown as seller
        seller:{
          name : "가게이름?",
          zipCode : "11111",
          baseAddress : "부산시 기장군",
          detailAddress : "파란하늘집",
          phone : "02-123-1234",
        }
    };
    return result;
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

// export const download = (memberListPage:memberListPage) => {
//     const url = filterToUrl(memberListPage);
//     postData('/download?' + url).then(() => {});
//     return 1;
// }

export const getUserList = async (): Promise<testuser[]> => {
    const data: APIResponse<testuser[]> = await getTestData();
    return data.result; // 비동기 결과를 반환
  };

const filterToUrl = (memberListPage : memberListPage):String => {
    const url = 'pageNo=' + memberListPage.pageNo + 
                '&size=' + memberListPage.size + 
                '&sort=' + memberListPage.sort +
                '&orderby=' + memberListPage.orderby +
                '&isFiltered=' + memberListPage.isFiltered +
                '&filter.MemberID=' + memberListPage.filter.memberID +
                '&filter.email=' + memberListPage.filter.email +
                '&filter.name=' + memberListPage.filter.name +
                '&filter.grade=' + memberListPage.filter.grade +
                '&filter.recommend=' + memberListPage.filter.recommend +
                '&filter.phone=' + memberListPage.filter.phone +
                '&filter.CreatedDateTime=' + memberListPage.filter.createdDateTime;
    return url;
}
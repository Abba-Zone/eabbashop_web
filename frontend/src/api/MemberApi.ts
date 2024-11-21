import { getData, postData, getTestData} from './mainApi'
import { updateAccessTokenAxios } from "../handlers/tokenHandler"
/* 데이터 불러오기*/
export const login = (loginUser:emailAndPassword):boolean => {
    postData<loginSuccess>('/login', loginUser)
        .then((data:APIResponse<loginSuccess>) => {
            if(data == null) //로그인 실패
                return false;
            else{ //로그인 성공
                updateAccessTokenAxios(data.result.accessToken, data.result.refreshToken);
                return true;
            }
        }
    );
    return false;
};

export const signup = (signupUser:signupUser):boolean => {
    const postResult = postData<loginSuccess>('/signup', signupUser)
        .then((data:APIResponse<loginSuccess>) => {
            if(data == null) //회운가입 실패
                return false;
            else{ //회원가입 성공
                updateAccessTokenAxios(data.result.accessToken, data.result.refreshToken);
                return true;
            }
        }
    );
    return false;
};

export const checkEmail = (email:string):number => {
    postData<number>('/mailauth', email)
        .then((data:APIResponse<number>) => {
            return data.result;
        }
    );
    return 1;
}

export const changeRole = (memberidAndRole:memberidAndRole) => {
    postData('/role/update', memberidAndRole).then(() => {});
}

export const logout = () =>{
    postData('/logout')
        .then(() => {
            updateAccessTokenAxios(null as unknown as string,null as unknown as string);
        }
    );
}

export const getlist = (memberListPage:memberListPage):memberList => {
    const url = filterToUrl(memberListPage);
    getData<memberList>('/list?' + url)
        .then((data:APIResponse<memberList>) => {
            return data.result;
        }
    );
    return null as unknown as memberList;
}

export const getintfo = (MemberID:string):memberDetail => {
    getData<memberDetail>('/info?MemberID='+ MemberID)
        .then((data:APIResponse<memberDetail>) => {
            return data.result;
        }
    );
    return null as unknown as memberDetail;
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
                '&filter.MemberID=' + memberListPage.filter.MemberID +
                '&filter.email=' + memberListPage.filter.email +
                '&filter.name=' + memberListPage.filter.name +
                '&filter.grade=' + memberListPage.filter.grade +
                '&filter.recommend=' + memberListPage.filter.recommend +
                '&filter.phone=' + memberListPage.filter.phone +
                '&filter.CreatedDateTime=' + memberListPage.filter.CreatedDateTime +
                '&filter.AK=' + memberListPage.filter.AK +
                '&filter.AP=' + memberListPage.filter.AP +
                '&filter.SP=' + memberListPage.filter.SP +
                '&filter.AW=' + memberListPage.filter.AW +
                '&filter.ABZ=' + memberListPage.filter.ABZ;
    return url;
}
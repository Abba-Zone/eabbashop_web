import { login, signup, authEmail, checkAuthCode, checkRecommendEmail, getUserList, getMemberList, getMemberDetail } from '../apis/memberApi'

/*데이터 가공 */
export const login_s = async (loginUser:emailAndPassword): Promise<loginSuccess> => {
    return await login(loginUser);
};

export const signup_s = async (signupUser: signupUser): Promise<boolean> => {
    return await signup(signupUser);
};

export const authEmail_s = async (email: string): Promise<string> => {
    return await authEmail(email);
};

export const checkAuthCode_s = async (email: string, code: string): Promise<{ status: number, isValid: boolean }> => {
    return await checkAuthCode(email, code);
};

export const checkRecommendEmail_s = async (email: string): Promise<string> => {
    return await checkRecommendEmail(email);
};

export const getMemberList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<memberList> => {
    return await getMemberList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getMemberDetail_s = async (memberId:string): Promise<memberDetailInfo> => {
    return await getMemberDetail(memberId);
};

export const getUserList_s = async (): Promise<testuser[]> => {
    return await getUserList();
};
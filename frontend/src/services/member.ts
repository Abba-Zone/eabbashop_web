import { login, signup, authEmail, checkAuthCode, 
    checkRecommendEmail, getUserList, getMemberList, getMemberDetail, 
    googleLogin, googleLoginWithCode, kakaoLoginWithCode, findID, requestAdmin, requestAdminList, requestAdminListAll, requestAdminResult, updateRole, changeRecommendEmail, requestAdminAuto
} from '../apis/memberApi'
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

export const checkRecommendEmail_s = async (email: string): Promise<{ status: number}> => {
    return await checkRecommendEmail(email);
};

export const changeRecommendEmail_s = async (referID: string, referredID: string): Promise<boolean> => {
    return await changeRecommendEmail(referID, referredID);
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

export const googleLogin_s = async (): Promise<loginSuccess> => {
    return await googleLogin();
};

export const googleLoginWithCode_s = async (code: string): Promise<loginSuccess | null> => {
    return await googleLoginWithCode(code);
};

export const kakaoLoginWithCode_s = async (code: string): Promise<loginSuccess | null> => {
    return await kakaoLoginWithCode(code);
};

export const findID_s = async (findIDParam: findIDParam): Promise<findIDResult | null> => {
    return await findID(findIDParam);
};

export const requestAdmin_s = async (WantRole: string, RefferedID: string): Promise<boolean> => {
    return await requestAdmin(WantRole, RefferedID);
};

export const requestAdminAuto_s = async (WantRole: string, RefferedID: string): Promise<boolean> => {
    return await requestAdminAuto(WantRole, RefferedID);
};

export const requestAdminList_s = async (): Promise<requestAdminRegistList> => {
    return await requestAdminList();
};

export const requestAdminListAll_s = async (): Promise<requestAdminRegistList> => {
    return await requestAdminListAll();
};

export const requestAdminResult_s = async (ChangeRequestId:string, Status:string): Promise<boolean> => {
    return await requestAdminResult(ChangeRequestId, Status);
};

export const updateRole_s = async (memberID:string, role:string): Promise<boolean> => {
    return await updateRole(memberID, role);
};
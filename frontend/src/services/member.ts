import { login, getUserList, getlist } from '../apis/memberApi'

/*데이터 가공 */
export const login_s = (loginUser:emailAndPassword):boolean => {
    login(loginUser);
    return false;
};

export const getUserList_s = async (): Promise<testuser[]> => {
    return await getUserList();
};

export const getMemberList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<memberList> => {
    return await getlist(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
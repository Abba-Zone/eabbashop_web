import { login, getUserList } from '../apis/memberApi'

/*데이터 가공 */
export const login_s = (loginUser:emailAndPassword):boolean => {
    login(loginUser);
    return false;
};

export const getUserList_s = async (): Promise<testuser[]> => {
    return await getUserList();
  };
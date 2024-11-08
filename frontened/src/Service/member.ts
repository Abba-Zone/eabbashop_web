import { login } from '../api/MemberApi'

/*데이터 가공 */
export const login_s = (loginUser:emailAndPassword):boolean => {
    login(loginUser);
    return false;
};
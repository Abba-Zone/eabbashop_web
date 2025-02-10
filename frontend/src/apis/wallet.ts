import { getData, postData } from './mainApi'


//지갑 조회
export const getMyWallet = async (): Promise<accountList> => {
    const response = await getData('/wallet');
    console.log(response.data);
    return response.data as accountList;
}

//지갑내역조회
export const getWalletList = async(pageNo:number, pageSize:number, startDate:string, endDate:string):Promise<boardList> => {
    /* real code*/
    try {
        const response = await getData<boardList>(
            `/wallet/list?pageNo=${pageNo}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}

//지갑내역조회(admin)
export const getWalletAdminList = async(pageNo:number, pageSize:number, startDate:string, endDate:string, memberID:string):Promise<historyAdminList> => {
    /* real code*/
    try {
        const response = await getData<historyAdminList>(
            `/wallet/list/admin?pageNo=${pageNo}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&memberID=${memberID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board list:', error);
        throw error;
    }
}
//지갑내역상세
//지갑내역상세(admin)



export const registAccount = async (newAccount:accountData):Promise<accountList> => {
    try {
        const response = await postData<accountList>('/account/register', newAccount);
        return response.data;
    } catch (error) {
        console.error('Error fetching regist account:', error);
        throw error;
    }
}

export const updateAccount = async (accountData:accountData):Promise<accountList> => {
    const response = await postData<accountList>('/account/update', accountData);
    return response.data;
}

export const deleteAccount = async (accountID:string):Promise<accountList> => {
    const response = await postData<accountList>('/account/delete', accountID);
    return response.data;
}
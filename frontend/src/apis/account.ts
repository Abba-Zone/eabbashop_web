import { getData, postData } from './mainApi'

export const getAccountList = async (): Promise<accountList> => {
    const response = await getData('/account/list');
    return response.data as accountList;
}

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
import { getAccountList, registAccount, updateAccount, deleteAccount } from '../apis/account'

export const getAccountList_s = async ():Promise<accountList> => {
    return await getAccountList();
}

export const registAccount_s = async (newAccount:accountData):Promise<accountList> => {
    return await registAccount(newAccount);
}

export const updateAccount_s = async (accountData:accountData):Promise<accountList> => {
    return await updateAccount(accountData);
}

export const deleteAccount_s = async (accountID:string):Promise<accountList> => {
    return await deleteAccount(accountID);
}
import { getWalletAdminList } from '../apis/wallet'

export const getHistoryList_s = async (pageNo:number, pageSize:number, startDate:string, endDate:string, memberID:string):Promise<historyAdminList> => {
    return await getWalletAdminList(pageNo, pageSize, startDate, endDate, memberID);
}

// export const registAccount_s = async (newAccount:accountData):Promise<accountList> => {
//     return await registAccount(newAccount);
// }

// export const updateAccount_s = async (accountData:accountData):Promise<accountList> => {
//     return await updateAccount(accountData);
// }

// export const deleteAccount_s = async (accountID:string):Promise<accountList> => {
//     return await deleteAccount(accountID);
// }
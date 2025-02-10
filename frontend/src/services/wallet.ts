import { getWalletAdminList, getAdminHistoryDetail } from '../apis/wallet'

export const getHistoryList_s = async (pageNo:number, pageSize:number, startDate:string, endDate:string, memberID:string):Promise<historyAdminList> => {
    return await getWalletAdminList(pageNo, pageSize, startDate, endDate, memberID);
}


export const getAdminHistoryDetail_s = async (historyID:string):Promise<adminHistoryDetailReciever> => {
    return await getAdminHistoryDetail(historyID);
}

// export const updateAccount_s = async (accountData:accountData):Promise<accountList> => {
//     return await updateAccount(accountData);
// }

// export const deleteAccount_s = async (accountID:string):Promise<accountList> => {
//     return await deleteAccount(accountID);
// }
import { getWalletAdminList, getAdminHistoryDetail, getHistoryDetail, getWalletList, requestCancel } from '../apis/wallet'

export const getHistoryList_s = async (pageNo:number, pageSize:number, startDate:string, endDate:string, memberID:string):Promise<historyAdminList> => {
    return await getWalletAdminList(pageNo, pageSize, startDate, endDate, memberID);
}

export const getMyHistoryList_s = async (pageNo:number, pageSize:number, startDate:string, endDate:string):Promise<historyList> => {
    return await getWalletList(pageNo, pageSize, startDate, endDate);
}

export const getHistoryDetail_s = async (historyID:string):Promise<historyDetailReciever> => {
    return await getHistoryDetail(historyID);
}

export const getAdminHistoryDetail_s = async (historyID:string):Promise<historyDetailReciever> => {
    return await getAdminHistoryDetail(historyID);
}

export const requestCancel_s = async (transferID:string):Promise<historyDetailReciever> => {
    return await requestCancel(transferID);
}
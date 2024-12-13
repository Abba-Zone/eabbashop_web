import { getShareLineList, getShareMoneyList, getShareMoneyDetailList } from '../apis/shareApi'
/* ShareLine */
export const getShareLineList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<shareLineList> => {
    return await getShareLineList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
/* ShareMoney */
export const getShareMoneyList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<shareMoneyList> => {
    return await getShareMoneyList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
/* ShareMoneyDetail */
export const getShareMoneyDetailList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<shareMoneyDetailList> => {
    return await getShareMoneyDetailList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
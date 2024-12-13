import { getPaymentList } from '../apis/requestApi'

/* Payment */
export const getPaymentList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<paymentList> => {
    return await getPaymentList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
import { getPaymentList, getTransferCancelList, getRefundList } from '../apis/requestApi'

/* Payment */
export const getPaymentList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<paymentList> => {
    return await getPaymentList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

/* TransferCancel */
export const getTransferCancelList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<transferCancelList> => {
    return await getTransferCancelList(pageNo, pageSize, filter, filterValue, sort, sortValue);
}

/* Refund */
export const getRefundList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:number): Promise<refundList> => {
    return await getRefundList(pageNo, pageSize, filter, filterValue, sort, sortValue, type);
}

import { getTransferList, getPaymentList, getTransferCancelList, getRefundList, getRefundDetail } from '../apis/requestApi'

/* Refund */
export const getTransferList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<transferList> => {
    return await getTransferList(pageNo, pageSize, filter, filterValue, sort, sortValue);
}

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
export const getRefundDetail_s = async (refundID:string): Promise<refundDetail> => {
    return await getRefundDetail(refundID);
};


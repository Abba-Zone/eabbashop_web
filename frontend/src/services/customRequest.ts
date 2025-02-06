import { getTransferList, getPaymentList, getTransferCancelList, getRefundList, getRefundDetail, registRefund, approveRequest } from '../apis/requestApi'

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
export const getRefundList_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string): Promise<refundList> => {
    return await getRefundList(pageNo, pageSize, filter, filterValue, sort, sortValue);
}
export const getRefundDetail_s = async (refundID:string): Promise<refundDetail> => {
    return await getRefundDetail(refundID);
};
export const registRefund_s = async (refundInfo:registRefund) => {
    return await registRefund(refundInfo);
};
export const approveRequest_s = async (refundData:{refundID:string, status:number}) => {
    return await approveRequest(refundData);
};


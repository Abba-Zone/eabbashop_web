import { getOrderList, getOrderDetail, getInvoiceList, getInvoiceDetail } from '../apis/sale'


/* Order */
export const getOrderList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<orderList> => {
    return await getOrderList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getOrderDetail_s = async (orderID:string): Promise<orderDetail> => {
    return await getOrderDetail(orderID);
};

/* Invoice */
export const getInvoiceList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<invoiceList> => {
    return await getInvoiceList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getInvoiceDetail_s = async (orderID:string): Promise<invoiceDetail> => {
    return await getInvoiceDetail(orderID);
};
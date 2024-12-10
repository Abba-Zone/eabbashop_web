import { getOrderList, getOrderDetail } from '../apis/sale'

export const getOrderList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<orderList> => {
    return await getOrderList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getOrderDetail_s = async (orderID:string): Promise<orderDetail> => {
    return await getOrderDetail(orderID);
};
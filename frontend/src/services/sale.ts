import { getOrderList, getShopOrderList, getOrderDetail, getShopOrderDetail, getInvoiceList, getInvoiceDetail, registInvoice,
        getShipmentList, getShipmentDetail, getRegularOrderList, getRegularOrderDetail, purchaseFromCart, purchaseDirect } from '../apis/sale'


/* Order */
export const getOrderList_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string): Promise<orderList> => {
    return await getOrderList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getShopOrderList_s = async (pageNo:number, pageSize:number, year:number): Promise<shopOrderList> => {
    return await getShopOrderList(pageNo, pageSize, year);
};

export const getOrderDetail_s = async (orderID:string): Promise<orderDetail> => {
    return await getOrderDetail(orderID);
};

export const getShopOrderDetail_s = async (orderID:string): Promise<shopOrderInfo> => {
    return await getShopOrderDetail(orderID);
};

/* Invoice */
export const getInvoiceList_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string): Promise<invoiceList> => {
    return await getInvoiceList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getInvoiceDetail_s = async (orderID:string): Promise<invoiceDetail> => {
    return await getInvoiceDetail(orderID);
};

export const registInvoice_s = async (newInvoice:registInvoice) => {
    return await registInvoice(newInvoice);
};
 
/* Shipment */
export const getShipmentList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<shipmentList> => {
    return await getShipmentList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getShipmentDetail_s = async (shipmentID:string): Promise<shipmentDetail> => {
    return await getShipmentDetail(shipmentID);
};
/* Regular Order */
export const getRegularOrderList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<regularOrderList> => {
    return await getRegularOrderList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getRegularOrderDetail_s = async (orderID:string): Promise<regularOrderDetail> => {
    return await getRegularOrderDetail(orderID);
};

/* Purchase */
export const purchaseFromCart_s = async (purchaseInfo: purchaseInfoToCart) => {
    return await purchaseFromCart(purchaseInfo);
};
export const purchaseDirect_s = async (purchaseInfo: purchaseInfoDirect) => {
    return await purchaseDirect(purchaseInfo);
};


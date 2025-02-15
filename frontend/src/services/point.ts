import { requestChargePointRequest, requestRefundPointRequest, getPointHistoryRequestMe,
    getPointHistoryRequestAdmin ,cancelChargeRefundRequest, getChargeRequestDetail, 
    changeChargeRequestStatus
} from "../apis/point";

export const requestChargePoint_s = async (requestPoint:requestPoint): Promise<requestPoint> => {
    console.log("requestChargePoint_s requestPoint = ", requestPoint);
    return await requestChargePointRequest(requestPoint);
};

export const requestRefundPoint_s = async (refundPoint:refundPoint): Promise<refundPoint> => {
    return await requestRefundPointRequest(refundPoint);
};

export const getPointHistoryRequestMe_s = async (pageNo: number, pageSize: number, filter: string, filterValue: string, sort: string, sortValue: string): Promise<pointHistory> => {
    let url = `/point/list/request?pageNo=${pageNo}&pageSize=${pageSize}`;
    
    if (filter && filterValue) {
        url += `&filter=${filter}&filterValue=${filterValue}`;
    }
    if (sort && sortValue) {
        url += `&sort=${sort}&sortValue=${sortValue}`;
    }
    return await getPointHistoryRequestMe(url);
};

export const getPointHistoryRequestAdmin_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string): Promise<pointHistory> => {
    let url = `/point/list/response?pageNo=${pageNo}&pageSize=${pageSize}`;
    
    if (filter && filterValue) {
        url += `&filter=${filter}&filterValue=${filterValue}`;
    }
    if (sort && sortValue) {
        url += `&sort=${sort}&sortValue=${sortValue}`;
    }
    return await getPointHistoryRequestAdmin(url);
};

export const cancelChargeRefund_s = async (chargeRefundID: string): Promise<void> => {
    return await cancelChargeRefundRequest(chargeRefundID);
};

export const getChargeRequestDetail_s = async (chargeRefundID: string): Promise<pointHistory> => {
    return await getChargeRequestDetail(chargeRefundID);
};

export const changeChargeRequestStatus_s = async (chargeRefundID: string, status: string): Promise<void> => {
    return await changeChargeRequestStatus(chargeRefundID, status);
};
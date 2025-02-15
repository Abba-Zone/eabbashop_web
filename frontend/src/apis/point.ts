import { getData, postData } from './mainApi'

export const requestChargePointRequest = async (requestPoint:requestPoint): Promise<requestPoint> => {
    const response = await postData<requestPoint>('/point/charge', requestPoint);
    return response.data as requestPoint;
}

export const requestRefundPointRequest = async (refundPoint:refundPoint): Promise<refundPoint> => {
    const response = await postData<refundPoint>('/point/refund', refundPoint);
    return response.data as refundPoint;
}

export const getPointHistoryRequestMe = async (url: string): Promise<pointHistory> => {
    const response = await getData<pointHistory>(url);
    return response.data as pointHistory;
}

export const getPointHistoryRequestAdmin = async (url:string): Promise<pointHistory> => {
    const response = await getData<pointHistory>(url);
    console.log("getPointHistoryRequestAdmin response = ", response);
    return response.data as pointHistory;
}

export const cancelChargeRefundRequest = async (chargeRefundID: string): Promise<void> => {
    const response = await postData<void>('/point/cancel', chargeRefundID);
    return response.data as void;
}

export const getChargeRequestDetail = async (chargeRefundID: string): Promise<pointHistory> => {
    const response = await getData<pointHistory>(`/point/detail/response?chargeRefundID=${chargeRefundID}`);
    return response.data as pointHistory;
}

export const changeChargeRequestStatus = async (chargeRefundID: string, status: string): Promise<void> => {
    const response = await postData<void>(`/point/confirm`, {
        chargeRefundID,
        status
    });
    console.log("changeChargeRequestStatus response = ", response);
    return response.data as void;
}
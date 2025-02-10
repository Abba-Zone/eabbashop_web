import { getData, postData } from './mainApi'

export const requestPointRequest = async (requestPoint:requestPoint): Promise<requestPoint> => {
    const response = await postData<requestPoint>('/charge', requestPoint);
    return response.data as requestPoint;
}

export const refundPointRequest = async (refundPoint:refundPoint): Promise<refundPoint> => {
    const response = await postData<refundPoint>('/refund', refundPoint);
    return response.data as refundPoint;
}
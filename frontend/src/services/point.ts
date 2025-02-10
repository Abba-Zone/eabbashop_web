import { requestPointRequest, refundPointRequest } from "../apis/point";

export const requestPoint_s = async (requestPoint:requestPoint): Promise<requestPoint> => {
    return await requestPointRequest(requestPoint);
};

export const refundPoint_s = async (refundPoint:refundPoint): Promise<refundPoint> => {
    return await refundPointRequest(refundPoint);
};
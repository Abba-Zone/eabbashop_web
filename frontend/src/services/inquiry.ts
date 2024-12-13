import { getInquiryList, getInquiryDetail } from '../apis/inquiry'

export const getInquiryList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<inquiryList> => {
    return await getInquiryList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
export const getInquiryDetail_s = async (inquiryID:string): Promise<inquiryDetail> => {
    return await getInquiryDetail(inquiryID);
};
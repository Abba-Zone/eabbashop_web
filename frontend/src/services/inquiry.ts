import {getlist } from '../apis/inquiry'

export const getInquiryList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<inquiryList> => {
    return await getlist(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
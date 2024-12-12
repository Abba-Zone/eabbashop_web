import { getlist } from '../apis/donation'

export const getDonationList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<donationList> => {
    return await getlist(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
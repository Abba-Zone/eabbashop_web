import { getShareLineList } from '../apis/shareApi'
/* ShareLine */
export const getShareLineList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<shareLineList> => {
    return await getShareLineList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};
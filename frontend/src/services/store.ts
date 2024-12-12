import { getlist } from '../apis/store'

export const getStoreList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<storeList> => {
    return await getlist(pageNo, pageSize, filter, filterValue, sort, sortValue,);
};
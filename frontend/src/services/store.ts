import { getStoreList, getStoreProductList, getStoreDetail} from '../apis/store'

export const getStoreList_s = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string): Promise<storeList> => {
    return await getStoreList(pageNo, pageSize, filter, filterValue, sort, sortValue,);
};

export const getStoreProductList_s = async (storeID:string, pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<productList> => {
    return await getStoreProductList(storeID, pageNo, pageSize, filter, filterValue, sort, sortValue,);
};

export const getStoreDetail_s = async (storeID:string): Promise<storeInfo> => {
    return await getStoreDetail(storeID);
};
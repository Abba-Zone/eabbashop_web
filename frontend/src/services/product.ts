import { getlist } from '../apis/productApi'
export const getProductList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<productList> => {
    return await getlist(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

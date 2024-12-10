import { getProductList, getProductDetail, getProductReviewList } from '../apis/productApi'
export const getProductList_s = async (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string): Promise<productList> => {
    return await getProductList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getProductDetail_s = async (productId:string): Promise<productDetailAndSeller> => {
    return await getProductDetail(productId);
};

export const getProductReviewList_s = async (pageNo:number, pageSize:number, sort:number, productID:string): Promise<reviewList> => {
    return await getProductReviewList(pageNo, pageSize, sort, productID);
};
import { getMainProductLists, getSearchProductList, getProductList, getProductDetail, getProductReviewList, registerProduct, modifyProduct, reviewLikes, registProductReview } from '../apis/productApi'

export const getMainProductLists_s = async (nation:string, viewSite:string): Promise<mainProductList> => {
    return await getMainProductLists(nation, viewSite);
};

export const getSearchProductList_s = async (params:searchParams): Promise<shopProductList> => {
    return await getSearchProductList(params);
};

export const getProductList_s = async (pageNo:number, pageSize:number, filter:string[], filterValue:string[], sort:string, sortValue:string): Promise<productList> => {
    return await getProductList(pageNo, pageSize, filter, filterValue, sort, sortValue);
};

export const getProductDetail_s = async (productId:string): Promise<productDetail> => {
    return await getProductDetail(productId);
};

export const registProduct_s = async (registProduct:registProduct) => {
    await registerProduct(registProduct);
}

export const modifyProduct_s = async (productInfo:modifyProduct) => {
    await modifyProduct(productInfo);
}

export const getProductReviewList_s = async (pageNo:number, pageSize:number, sort:number, productID:string): Promise<reviewList> => {
    return await getProductReviewList(pageNo, pageSize, sort, productID);
};

export const reviewLikes_s = async (productReviewID:string, type:number): Promise<{like:number, dislike:number}> => {
    return await reviewLikes(productReviewID, type);
};

export const registProductReview_s = async(reivewInfo:registReview) => {
    return await registProductReview(reivewInfo);
}
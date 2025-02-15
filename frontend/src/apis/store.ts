import { getData , postData} from './mainApi'
export const getStoreList = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string):Promise<storeList> => {
    /* real code*/
    try {
        const response = await getData<storeList>(
            `/member/seller/list?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&sortValue=${sortValue}&filter=${filter}&filterValue=${filterValue}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching seller list:', error);
        throw error;
    }
}

export const getStoreProductList = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string, sellerID:string):Promise<productList> => {
    /* real code*/
    try {
        const response = await getData<productList>(
            `/member/seller/list/product?pageNo=${pageNo}&pageSize=${pageSize}&sort=${sort}&sortValue=${sortValue}&filter=${filter}&filterValue=${filterValue}&sellerID=${sellerID}`,
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching seller list:', error);
        throw error;
    }
}

export const getStoreDetail = async(sellerID:string):Promise<storeInfo> => {
    try {
        const response = await getData<storeInfo>(
            `/member/seller/detail?sellerID=${sellerID}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching seller list:', error);
        throw error;
    }
}
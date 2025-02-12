import { getData } from './mainApi'
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

export const getStoreProductList = (storeID:string, pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):productList => {
    /* real code*/
    // getData<storeList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<storeList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as storeList;

    /* make for test*/
    var result :productList = {
        totalCount: 123412414,
        list : [
            {productID: "1dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "Y",},
            {productID: "2dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "N",},
            {productID: "3dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "N",},
            {productID: "4dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "Y",}
        ]
    };
    return result;
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
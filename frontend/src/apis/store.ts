import { getData, postData, getTestData} from './mainApi'
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

    /* make for test*/
    var result :storeList = {
        totalCount : 10003,
        list:[
            {storeID : "1asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "2asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "3asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "4asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "5asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"}
        ]
    };
    return result;
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

export const getStoreDetail = (productID:string):storeInfo => {
    // getData<storeInfo>('/store/detail?productID='+ productID)
    //     .then((data:APIResponse<storeInfo>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as storeInfo;
    
    var result:storeInfo= {
        storeID : "1asbebxcvbxcvbcb",
		name : "가게이름?",
		host:"정 경훈C",
		phone : "02-123-1234",
		zipCode : "11111",
		baseAddress : "부산시 기장군",
		detailAddress : "파란하늘집",
		createdDateTime :"2024-12-12 13:25:33"
    };
    return result;
}
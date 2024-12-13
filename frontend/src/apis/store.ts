import { getData, postData, getTestData} from './mainApi'
export const getStoreList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):storeList => {
    /* real code*/
    // getData<storeList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<storeList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as storeList;

    /* make for test*/
    var result :storeList = {
        totalStore : 10003,
        stores:[
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
            {productID: "1dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,},
            {productID: "2dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "3dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "4dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,}
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
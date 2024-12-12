import { getData, postData, getTestData} from './mainApi'

export const getlist = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):storeList => {
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
        store:[
            {storeID : "1asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "2asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "3asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "4asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"},
            {storeID : "5asbebxcvbxcvbcb", name : "매장명예시입니다", host : "전 현태A", phone : "010-1234-5678", createdDateTime : "2024-11-21 11:53:11"}
        ]
    };
    return result;
}
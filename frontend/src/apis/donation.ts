import { getData, postData, getTestData} from './mainApi'

export const getDonationList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):donationList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :donationList = {
        totalCount : 10003,
        list:[
            {donationID : "23w13ww4r4t5t", name : "전 현태", money : 20.0, type : "kmoney", accumulation : 1000000.0, createdDateTime : "2024-11-12 17:38:22"},
            {donationID : "23w13ww4r4t5t", name : "전 현태", money : 20.0, type : "kmoney", accumulation : 1000000.0, createdDateTime : "2024-11-12 17:38:22"},
            {donationID : "23w13ww4r4t5t", name : "전 현태", money : 20.0, type : "kmoney", accumulation : 1000000.0, createdDateTime : "2024-11-12 17:38:22"},
            {donationID : "23w13ww4r4t5t", name : "전 현태", money : 20.0, type : "kmoney", accumulation : 1000000.0, createdDateTime : "2024-11-12 17:38:22"},
            {donationID : "23w13ww4r4t5t", name : "전 현태", money : 20.0, type : "kmoney", accumulation : 1000000.0, createdDateTime : "2024-11-12 17:38:22"}
        ]
    };
    return result;
}
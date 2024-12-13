import { getData, postData, getTestData} from './mainApi'

/* Payment */
export const getPaymentList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):paymentList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :paymentList = {
        totalCount : 10003,
        list:[
            {createdDateTime : "2024-11-15 16:30:22", money : 1111.0, name: "전 현태A", paymentID: "1q2w3er4t5t", status :" 보류중"},
            {createdDateTime : "2024-11-15 16:30:22", money : 1111.0, name: "전 현태A", paymentID: "1q2w3er4t5t", status :" 보류중"},
            {createdDateTime : "2024-11-15 16:30:22", money : 1111.0, name: "전 현태A", paymentID: "1q2w3er4t5t", status :" 보류중"},
            {createdDateTime : "2024-11-15 16:30:22", money : 1111.0, name: "전 현태A", paymentID: "1q2w3er4t5t", status :" 보류중"},
            {createdDateTime : "2024-11-15 16:30:22", money : 1111.0, name: "전 현태A", paymentID: "1q2w3er4t5t", status :" 보류중"}
        ]
    };
    return result;
}

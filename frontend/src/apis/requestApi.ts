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

/* Refund */
export const getRefundList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string, type:number):refundList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :refundList = {
        totalCount : 10003,
        list:[
            {createdDateTime : "2024-11-15 16:30:22", name : "전 현태A", orderID : "1q2w3er4t5t", phone : "010-1234-5678", refundID : "1q2w3er4t5t", status : "완료"},
            {createdDateTime : "2024-11-15 16:30:22", name : "전 현태A", orderID : "1q2w3er4t5t", phone : "010-1234-5678", refundID : "1q2w3er4t5t", status : "완료"},
            {createdDateTime : "2024-11-15 16:30:22", name : "전 현태A", orderID : "1q2w3er4t5t", phone : "010-1234-5678", refundID : "1q2w3er4t5t", status : "보류"},
            {createdDateTime : "2024-11-15 16:30:22", name : "전 현태A", orderID : "1q2w3er4t5t", phone : "010-1234-5678", refundID : "1q2w3er4t5t", status : "보류"},
            {createdDateTime : "2024-11-15 16:30:22", name : "전 현태A", orderID : "1q2w3er4t5t", phone : "010-1234-5678", refundID : "1q2w3er4t5t", status : "완료"},
        ]
    };
    return result;
}


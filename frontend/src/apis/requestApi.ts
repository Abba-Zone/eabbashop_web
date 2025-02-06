import { getData, postData, getTestData} from './mainApi'

/* Payment */
export const getTransferList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):transferList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :transferList = {
        totalCount : 10003,
        list:[
        ]
    };
    return result;
}

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

/* TransferCancel */
export const getTransferCancelList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):transferCancelList => {
    /* real code*/
    // getData<boardList>('/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<boardList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as boardList;

    /* make for test*/
    var result :transferCancelList = {
        totalCount : 10003,
        list:[
            { accountHistroyID : "1q2w3er4t5t", createdDateTime : "2024-11-15 16:30:22", money : 100000, moneyType : "komoney", receiverName : "전 현태A", senderName : "전 현태B", status : "보류" },
            { accountHistroyID : "1q2w3er4t5t", createdDateTime : "2024-11-15 16:30:22", money : 100000, moneyType : "komoney", receiverName : "전 현태A", senderName : "전 현태B", status : "완료" },
            { accountHistroyID : "1q2w3er4t5t", createdDateTime : "2024-11-15 16:30:22", money : 100000, moneyType : "komoney", receiverName : "전 현태A", senderName : "전 현태B", status : "보류" },
            { accountHistroyID : "1q2w3er4t5t", createdDateTime : "2024-11-15 16:30:22", money : 100000, moneyType : "komoney", receiverName : "전 현태A", senderName : "전 현태B", status : "완료" },
            { accountHistroyID : "1q2w3er4t5t", createdDateTime : "2024-11-15 16:30:22", money : 100000, moneyType : "komoney", receiverName : "전 현태A", senderName : "전 현태B", status : "보류" }
        ]
    };
    return result;
}

/* Refund */
export const getRefundList = async (pageNo:number, pageSize:number, filter:string, filterValue:string, sort:string, sortValue:string):Promise<refundList> => {
    /* real code*/
    try {
        const response = await getData<refundList>(
            `/order/refund/list?` + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue,
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching refund list:', error);
        throw error;
    }
}
export const getRefundDetail = (refundID:string):refundDetail => {
    // getData<refundDetail>('/product/detail?productID='+ productID)
    //     .then((data:APIResponse<refundDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as refundDetail;
    
    var result:refundDetail= {
       createdDateTime : "2024-11-15 16:30:22",
       firstName: '현태',
       lastName: '전',
       orderDetailID : "1q2w3er4t5t",
       phone : "010-1234-5678",
       productName : "물병병",
       quantity : 1,
       refundID : "1q2w3er4t5t",
       status : 100,
       type : 100
    };
    return result;
}

export const registRefund = async (refundInfo:registRefund) => {
    /* real code*/
    try {
        const response = await postData<string>(
            `/order/refund`,
            refundInfo
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching regist refund:', error);
        throw error;
    }
}

export const approveRequest = async (refundData:{refundID:string, status:number}) => {
    /* real code*/
    try {
        const response = await postData<string>(
            `/order/refund/approve`,
            refundData
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching approve refund:', error);
        throw error;
    }
}

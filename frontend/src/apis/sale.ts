import { getData, postData, getTestData} from './mainApi'

/* ORder */
export const getOrderList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):orderList => {
    /* real code*/
    // getData<orderList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<orderList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as orderList;

    /* make for test*/
    var result :orderList = {
        totalOrder: 123412414,
        orders : [
            {orderID: "1dvxb32c45s7d87b49lkfdvb", productName : "물병",memberName : "전 현태",	status : "배송중", createdDateTime : "2024-11-15 16:30:22",},
            {orderID: "2dvxb32c45s7d87b49lkfdvb", productName : "물병",memberName : "전 현태",	status : "처리중", createdDateTime : "2024-11-15 16:30:22",},
            {orderID: "3dvxb32c45s7d87b49lkfdvb", productName : "물병",memberName : "전 현태",	status : "배송완료", createdDateTime : "2024-11-15 16:30:22",},
            {orderID: "4dvxb32c45s7d87b49lkfdvb", productName : "물병",memberName : "전 현태",	status : "배송중", createdDateTime : "2024-11-15 16:30:22",},
            {orderID: "5dvxb32c45s7d87b49lkfdvb", productName : "물병",memberName : "전 현태",	status : "배송완료", createdDateTime : "2024-11-15 16:30:22",},
        ]
    };
    return result;
}

export const getOrderDetail = (orderID:string):orderDetail => {
    // getData<orderDetail>('/info?orderID='+ orderID)
    //     .then((data:APIResponse<orderDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as orderDetail;
    var result:orderDetail= {
       address : {
        name : "전현태",
        phone : "010-1234-5678",
        zipCode: "12345",
        baseAddress: "청주시 흥덕구 봉명동",
        detailAddress: "아파트 00동00호",
        billZipCode : "11111111111",
        billBaseAddress : "부산시 기장군 기장읍",
        billDetailAddress : "아파트 아파트 아파트 아파트",
        comment : "문앞에 던져주세요",
       },
       member : {
        name : "전현태",
        email : "chc526@gmail.com",
        role: "대리점",
        grade: "gold"
       },
       order : {
        productName : "물병",
        quantity : 12,
        status : "배송중",
        결제방식:"아빠페이",
        createdDateTime : "2024-11-12 17:38:22",
       },
       product : {
        thumbnail : "https://abbazon.us",
		productName : "물병",
		taxFreePrice : 10.0,
		SPPrice : 2.0,
		realPrice : 8.0,
		allowNation : ["KOR"],
		viewSite : "A",
       }
    };
    return result;
}

/* Invoice */
export const getInvoiceList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):invoiceList => {
    /* real code*/
    // getData<invoiceList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<invoiceList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as invoiceList;

    /* make for test*/
    var result :invoiceList = {
        totalInvoice: 123412414,
        invoices : [
            {invoiceID : "1x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "2x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "3x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "4x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "5x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
        ]
    };
    return result;
}
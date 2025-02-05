import { getData, postData, getTestData} from './mainApi'

/* Order */
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
        totalCount: 123412414,
        list : [
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

export const getShopOrderDetail = (orderID:string):shopOrderInfo => {
    // getData<orderDetail>('/info?orderID='+ orderID)
    //     .then((data:APIResponse<orderDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as orderDetail;
    var result:shopOrderInfo= {
       "order_id": "df391c47-b28f-4537-ba65-a07979a03ac8",
        "created_date_time": "2025-01-10T00:39:26",
        "name": "A BCD",
        "phone": "010-1111-2222",
        "zipCode": "20001",
        "baseAddress": "123 Main St",
        "detailAddress": "Apt 4B",
        "billZipCode": "10117",
        "billBaseAddress": "Unter den Linden 77",
        "billDetailAddress": "Office 301",
        "comment": "null",
        "totalRealPrice": 2200.00,
        "totalLP": 1000.00,
        "totalAK": 0.00,
        "totalSP": 1200.00,
        "order_details": [
        {
            "orderDetailID": "2b8b49b8-a409-4eb1-8920-7e9b7d45918e",
            "productID": "fc6ee6e7-ee5b-47d9-aae7-62ea7d653af9",
            "name": "Change Sample Product2",
            "allowNation": "KR,US,JP",
            "viewSite": "A",
            "quantity": 2,
            "status": 400,
            "thumbnail": "https://example.com/sample-thumbnail.jpg",
            "LP": 1000.00,
            "AK": 0.0,
            "SP": 1200.00
        },
        {
            "orderDetailID": "2b8b49b8-a409-4eb1-8920-7e9b7d45918e",
            "productID": "fc6ee6e7-ee5b-47d9-aae7-62ea7d653af9",
            "name": "Change Sample Product2",
            "allowNation": "KR,US,JP",
            "viewSite": "A",
            "quantity": 2,
            "status": 400,
            "thumbnail": "https://example.com/sample-thumbnail.jpg",
            "LP": 1000.00,
            "AK": 0.0,
            "SP": 1200.00
        }
    ]

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
        totalCount: 123412414,
        list : [
            {invoiceID : "1x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "2x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "3x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "4x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {invoiceID : "5x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55",	invoiceNo : "123456364575467", status: "결제", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
        ]
    };
    return result;
}

export const getInvoiceDetail = (invoiceID:string):invoiceDetail => {
    // getData<invoiceDetail>('/info?invoiceID='+ invoiceID)
    //     .then((data:APIResponse<invoiceDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as invoiceDetail;
    var result:invoiceDetail= {
       invoiceNo : "123456364575467",
        order : {
            orderedDateTime : "2024-11-14 22:23:11",
            status : "결제",
            IP : "111.222.333.444"
        },
        member : {
            name : "정경훈",
            email:"",
            role : "",
            grade : "",
            phone : ""
        },
        billAddress :{
            zipCode: "213-12",
            baseAddress: "부산시 기장군",
            detailAddress: "아바로",
            phone : "010-1234-5678"
        },
        shippingAddress :{
            zipCode: "213-12",
            baseAddress: "부산시 기장군",
            detailAddress: "아바로",
            phone : "010-1234-5678"
        },
        product:{
            thumbnail : "https://abbazon.us",
            productName : "물병",
            taxFreePrice : 2.0,
            SPPrice : 8.0,
            realPrice : 10.0,
            allowNation : ["KOR"],
            viewSite : "A",
        }
    };
    return result;
}

/* Shipment */
export const getShipmentList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):shipmentList => {
    /* real code*/
    // getData<shipmentList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<shipmentList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as shipmentList;

    /* make for test*/
    var result :shipmentList = {
        totalCount: 123412414,
        list : [
            {shipmentID : "1x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55", invoiceNo: "123456364575467", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {shipmentID : "2x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55", invoiceNo: "123456364575467", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {shipmentID : "3x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55", invoiceNo: "123456364575467", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {shipmentID : "4x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55", invoiceNo: "123456364575467", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
            {shipmentID : "5x2c33xq445wq6rew6578", orderDetailID : "1232wew3r34t55", invoiceNo: "123456364575467", name : "정경훈", createdDateTime : "2024-11-15 17:13:22"},
        ]
    };
    return result;
}

export const getShipmentDetail = (shipmentID:string):shipmentDetail => {
    // getData<shipmentDetail>('/info?shipmentID='+ shipmentID)
    //     .then((data:APIResponse<shipmentDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as shipmentDetail;
    var result:shipmentDetail= {
        info:{
            invoiceNo : "123456364575467",
            shipmentID : "1x2c33xq445wq6rew6578",
            orderDetailID : "1232wew3r34t55",
            name : "정경훈",
            createdDateTime : "2024-11-15 17:13:22",
            scheduledTime : "2024-11-15 18:13:22",
            completionTime : "2024-11-15 18:13:22",
            reference : "개꿀입니다.",
        },
        order : {
            orderedDateTime : "2024-11-14 22:23:11",
            status : "결제",
            IP : "111.222.333.444"
        },
        member : {
            name : "정경훈",
            email:"",
            role : "",
            grade : "",
            phone : ""
        },
        billAddress :{
            zipCode: "213-12",
            baseAddress: "부산시 기장군",
            detailAddress: "아바로",
            phone : "010-1234-5678"
        },
        shippingAddress :{
            zipCode: "213-12",
            baseAddress: "부산시 기장군",
            detailAddress: "아바로",
            phone : "010-1234-5678"
        },
    };
    return result;
}
/* Regular Order */
export const getRegularOrderList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):regularOrderList => {
    /* real code*/
    // getData<orderList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<orderList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as orderList;

    /* make for test*/
    var result :regularOrderList = {
        totalCount: 123412414,
        list : []
    };
    return result;
}

export const getShopOrderList = async (pageNo:number, pageSize:number, year:number):Promise<shopOrderList> => {
    /* real code*/
    // try {
    //     const response = await getData<shopOrderList>(
    //         `/order/list?pageNo=${pageNo}&pageSize=${pageSize}&year=${year}`
    //     );
    //     console.log(response.data);
    //     return response.data;
    // } catch (error) {
    //     console.error('Error fetching board list:', error);
    //     throw error;
    // }

    /* make for test*/
    var result :shopOrderList = {
        totalCount: 123412414,
        list : [{
            "order_id": "df391c47-b28f-4537-ba65-a07979a03ac8",
            "created_date_time": "2025-01-10T00:39:26",
            "order_details": [
                {
                    "orderDetailID": "2b8b49b8-a409-4eb1-8920-7e9b7d45918e",
                    "productID": "fc6ee6e7-ee5b-47d9-aae7-62ea7d653af9",
                    "name": "Change Sample Product",
                    "allowNation": "KR,US,JP",
                    "viewSite": "A",
                    "quantity": 2,
                    "status": 100,
                    "thumbnail": "https://abbazonbucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%B8%ED%94%BC.png",
                    "LP": 1000.00,
                    "AK": 0.0,
                    "SP": 1200.00
                },
                {
                    "orderDetailID": "2b8b49b8-a409-4eb1-8920-7e9b7d45918e",
                    "productID": "fc6ee6e7-ee5b-47d9-aae7-62ea7d653af9",
                    "name": "Change Sample Product",
                    "allowNation": "KR,US,JP",
                    "viewSite": "A",
                    "quantity": 2,
                    "status": 100,
                    "thumbnail": "https://abbazonbucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%B8%ED%94%BC.png",
                    "LP": 1000.00,
                    "AK": 0.0,
                    "SP": 1200.00
                }
            ]
        },
        {
            "order_id": "df391c47-b28f-4537-ba65-a07979a03ac8",
            "created_date_time": "2025-01-10T00:39:26",
            "order_details": [
                {
                    "orderDetailID": "2b8b49b8-a409-4eb1-8920-7e9b7d45918e",
                    "productID": "fc6ee6e7-ee5b-47d9-aae7-62ea7d653af9",
                    "name": "Change Sample Product",
                    "allowNation": "KR,US,JP",
                    "viewSite": "A",
                    "quantity": 2,
                    "status": 100,
                    "thumbnail": "https://abbazonbucket.s3.ap-northeast-2.amazonaws.com/%EC%8B%B8%ED%94%BC.png",
                    "LP": 1000.00,
                    "AK": 0.0,
                    "SP": 1200.00
                }
            ]
        },]
    };
    return result;
}

export const getRegularOrderDetail = (orderID:string):regularOrderDetail => {
    // getData<orderDetail>('/info?orderID='+ orderID)
    //     .then((data:APIResponse<orderDetail>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as orderDetail;
    var result:regularOrderDetail= {
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
       info : {
        memberName:"전현태A",
        orderID:"asdfbsgrdbxcvb",
        period:30,
        productID:"btrgnbvnvbnvbn",
        productName : "물병",
        quantity : 12,
        createdDateTime : "2024-11-12 17:38:22",
       }
    };
    return result;
}

/* Purchase */
export const purchaseFromCart = async (purchaseInfo: purchaseInfoToCart):Promise<addressList> => {
    try {
        const response = await postData<addressList>('/order/cart/register', purchaseInfo);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching purchase from cart:', error);
        throw error;
    }
}

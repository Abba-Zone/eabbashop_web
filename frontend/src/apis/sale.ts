import { getData, postData, getTestData} from './mainApi'

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
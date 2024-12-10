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
import { getData, postData, getTestData} from './mainApi'
import { updateAccessTokenAxios } from "../handlers/tokenHandler"

export const getlist = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):productList => {
    /* real code*/
    // getData<productList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<productList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as productList;

    /* make for test*/
    var result :productList = {
        totalProduct: 123412414,
        products : [
            {productID: "1dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,},
            {productID: "2dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "3dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "4dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,}
        ]
    };
    return result;
}
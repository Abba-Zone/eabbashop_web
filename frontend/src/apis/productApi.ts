import { getData, postData, getTestData} from './mainApi'
import { updateAccessTokenAxios } from "../handlers/tokenHandler"

export const getProductList = (pageNo:number, pageSize:number, filter:number, filterValue:string, sort:string, sortValue:string):productList => {
    /* real code*/
    // getData<productList>('/list/admin?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&filter='+ filter + '&filterValue='+ filterValue + '&sort='+ sort+ '&sortValue='+ sortValue)
    //     .then((data:APIResponse<productList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as productList;

    /* make for test*/
    var result :productList = {
        totalCount: 123412414,
        list : [
            {productID: "1dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,},
            {productID: "2dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "3dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : false,},
            {productID: "4dvxb32c45s7d87b49lkfdvb", name : "물병",seller : "전 현태",	stock : 100, activeYN : true,}
        ]
    };
    return result;
}

export const getProductDetail = (productID:string):productDetailAndSeller => {
    // getData<productDetailAndSeller>('/product/detail?productID='+ productID)
    //     .then((data:APIResponse<productDetailAndSeller>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as productDetailAndSeller;
    
    var result:productDetailAndSeller= {
        product: {
            productID : "qwer1234",
            name : "물병",
            thumbnail: "썸네일이미지주소",
            taxFreePrice : 20.0,
            SPPrice : 5.0,
            realPrice : 25.0,
            stock: 10, 
            description : "물을 오래 보관할 수 있음(이미지도 있음)",
            summary : "물담는 거",
            paybackRatio : 0.5,
            categories : ["qw12as", "12qwas"],
            allowNation : ["KOR", "USA"],
            viewSite : "A",
            showYN :true,
            activeYN : true
        },
        seller:{
            baseAddress:"부산시 기장군",
            detailAddress:"파란하늘집",
            name:"가게이름?",
            phone:"02-123-1234",
            zipCode:"11111",
            email:"qweasd@gmail.com",
            host:"정 경훈A",
        }
    };
    return result;
}

export const getProductReviewList = (pageNo:number, pageSize:number, sort:number, productID:string):reviewList => {
    /* real code*/
    // getData<reviewList>('/review/list?' + 'pageNo='+ pageNo + '&pageSize='+ pageSize + '&orderby='+ sort + '&productID='+ productID)
    //     .then((data:APIResponse<reviewList>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as reviewList;

    /* make for test*/
    var result :reviewList = {
        totalCount: 123,
        list : [
            {
                comment : "이 제품을 먹었더니 머리가 났어요.",
                createdDateTime : "2024-11-12 17:38:22",
                dislike : 5,
                like : 2,
                name : "유 현태",
                productReviewId : "qweqweq",
                score : 5
            }
        ]
    };
    return result;
}
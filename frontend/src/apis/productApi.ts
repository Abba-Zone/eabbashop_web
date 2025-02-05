import { getData, postData } from './mainApi'

export const getMainProductLists = async (nation:string, viewSite:string):Promise<mainProductList> => {
    /* real code*/
    try {
        const bestProducts = await postData<shopProductList>(`/product/list/shop`, bestData());
        const newProducts = await postData<shopProductList>(`/product/list/shop`, newData());
        const randomProducts = await postData<shopProductList>(`/product/list/shop`, randomData());
        console.log(newProducts.data)
        return {bestProducts: bestProducts.data.list, randomProducts:randomProducts.data.list, newProducts:newProducts.data.list};
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
    /* make for test*/
    const result :mainProductList = {
        bestProducts:[],
        newProducts:[],
        randomProducts:[]
    };
    for(let i = 0 ; i < 15 ; i++){
        result.bestProducts.push({productID : "aasg564olvizxhncb32", thumbnail : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4is8rP6vgN2j1gBkrHpjZepJvJisJcdS9c5qjIzkeMZusSlpdY0xIEplzTvQZtJQksvL5ljEvnrXDD1Hk_dTgSM4xis4RiDWx6H5Baz8", productName : `상품이름test`+i, realPrice : 14, AP : 5, AW : 3, AK : 5, averageScore:4.5, reviewCnt:50});
        result.newProducts.push({productID : "aasg564olvizxhncb32", thumbnail : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4is8rP6vgN2j1gBkrHpjZepJvJisJcdS9c5qjIzkeMZusSlpdY0xIEplzTvQZtJQksvL5ljEvnrXDD1Hk_dTgSM4xis4RiDWx6H5Baz8", productName : `상품이름test`+i, realPrice : 14, AP : 5, AW : 3, AK : 5, averageScore:4.5, reviewCnt:50});
        result.randomProducts.push({productID : "aasg564olvizxhncb32", thumbnail : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4is8rP6vgN2j1gBkrHpjZepJvJisJcdS9c5qjIzkeMZusSlpdY0xIEplzTvQZtJQksvL5ljEvnrXDD1Hk_dTgSM4xis4RiDWx6H5Baz8", productName : `상품이름test`+i, realPrice : 14, AP : 5, AW : 3, AK : 5, averageScore:4.5, reviewCnt:50});
    }
    return result;
}

export const getSearchProductList = async (params:searchParams):Promise<shopProductList> => {
    /* real code*/
    try {
        console.log(params);
        const response = await postData<shopProductList>(`/product/list/shop`, params);
        return response.data;
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
    /* make for test*/
    const result :shopProductList = {
        list:[],
        totalCount:15,
    };
    for(let i = 0 ; i < 15 ; i++){
        result.list.push({productID : "aasg564olvizxhncb32", thumbnail : "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT4is8rP6vgN2j1gBkrHpjZepJvJisJcdS9c5qjIzkeMZusSlpdY0xIEplzTvQZtJQksvL5ljEvnrXDD1Hk_dTgSM4xis4RiDWx6H5Baz8", productName : `상품이름test`+i, realPrice : 14, AP : 5, AW : 3, AK : 5, averageScore:4.5, reviewCnt:50});
    }
    console.log(result);
    return result;
}

export const getProductList = async (pageNo:number, pageSize:number, filter:string[], filterValue:string[], sort:string, sortValue:string):Promise<productList> => {
    /* real code*/
    const data ={
        "page": pageNo,
        "size": pageSize,
        "orderBy": sort,
        "orderByType": sortValue,
        "params" : [
            ...filter
        ],
        "values" : [
            ...filterValue
        ]
    }
    try {
        const response = await postData<productList>(`/product/list/admin`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }

    /* make for test*/
    var result :productList = {
        totalCount: 123412414,
        list : [
            {productID: "1dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "Y",},
            {productID: "2dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "N",},
            {productID: "3dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "N",},
            {productID: "4dvxb32c45s7d87b49lkfdvb", productName : "물병",sellerName : "전 현태",	stock : 100, activeYN : "Y",}
        ]
    };
    return result;
}

export const getProductDetail = async (productID:string):Promise<productDetail> => {
    try {
        const response = await getData<productDetail>(
            '/product/detail/'+ productID
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }

    // getData<productDetailAndSeller>('/product/detail?productID='+ productID)
    //     .then((data:APIResponse<productDetailAndSeller>) => {
    //         return data.result;
    //     }
    // );
    // return null as unknown as productDetailAndSeller;
    
    var result:productDetail= {
        sellerId:"123",
        categoryId:"1",
        categoryName:"test_cate",
        productID : "qwer1234",
        productName : "물병",
        thumbnail: "썸네일이미지주소",
        taxFreePrice : 20.0,
        spPrice : 5.0,
        realPrice : 25.0,
        stock: 10, 
        description : "물을 오래 보관할 수 있음(이미지도 있음)",
        summary : "물담는 거",
        paybackRatio : 0.5,
        categories : [{"ID":"qw12as", "name":"생필품"}, {"ID":"12qwas","name" :"치약"}],
        allowNation : ["KOR", "USA"],
        viewSite : "A",
        showYN :"Y",
        activeYN : "Y"
    };
    return result;
}

export const registerProduct = (registProduct:registProduct) => {
    /* real code*/
    postData<reviewList>('/product/register', registProduct)
        .then((data:any) => {
            // return data.result;
        }
    );
    console.log("Test")
}

export const modifyProduct = (productInfo:modifyProduct) => {
    /* real code*/
    postData<reviewList>('/product/update', productInfo)
        .then((data:any) => {
            // return data.result;
        }
    );
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
                comment : "<h2>이 제품을 먹었더니 머리가 났어요.</h2>",
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

export const  reviewLikes = (productReviewID:string, type:number) : {like:number, dislike:number} =>{
    /* real code*/
    // postData<{like:number, dislike:number}>('/review/like?', {productReviewID:productReviewID, type:type})
    //     .then((data) => {
    //         return data;
    //     }
    // );
    /* make for test*/
    return{"like" : 123123123,"dislike" : 21312};
}

const buildQueryParams = (params: searchParams): string => {
    return "page=" + params.page.toString()
        + "&size=" + params.size.toString()
        + "&orderBy=" + params.orderBy
        + "&orderByType=" + params.orderByType
        + "&params=" + encodeURIComponent(JSON.stringify(params.params))  // params 배열을 JSON 문자열로 변환
        + "&values=" + encodeURIComponent(JSON.stringify(params.values));   // values 배열을 JSON 문자열로 변환
};

const bestData = () =>{
    return {
        "page": 0,
        "size": 15,
        "orderBy": "createdDateTime",
        "orderByType": "DESC",
        "params" : [],
        "values" : []
    }
}
const newData = () =>{
    return {
        "page": 0,
        "size": 15,
        "orderBy": "createdDateTime",
        "orderByType": "DESC",
        "params" : [],
        "values" : []
    }
}
const randomData = () =>{
    return {
        "page": 0,
        "size": 15,
        "orderBy": "createdDateTime",
        "orderByType": "DESC",
        "params" : [],
        "values" : []
    }
}
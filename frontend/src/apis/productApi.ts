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
    console.log(data);
    try {
        const response = await postData<productList>(`/product/list/admin`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product list:', error);
        throw error;
    }
}

export const getProductDetail = async (productID:string):Promise<productDetail> => {
    try {
        const response = await getData<productDetail>(
            '/product/detail/'+ productID
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product detail:', error);
        throw error;
    }
}

export const registerProduct = (registProduct:registProduct) => {
    /* real code*/
    postData<{message:string}>('/product/register', registProduct)
        .then(() => {
            // return data.result;
        }
    );
}

export const modifyProduct = (productInfo:modifyProduct) => {
    /* real code*/
    postData<{message:string}>('/product/update', productInfo)
        .then(() => {
            // return data.result;
        }
    );
}

export const getProductReviewList = async (pageNo:number, pageSize:number, sort:number, productID:string):Promise<reviewList> => {
    /* real code*/
    try {
        const response = await getData<reviewList>(
            `/product/review/${productID}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching product review list:', error);
        throw error;
    }
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

export const registProductReview = (registReviewInfo:registReview) => {
    /* real code*/
    postData<{message:string}>('/product/review/register', registReviewInfo)
        .then((data:any) => {
            // return data.result;
        }
    );
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
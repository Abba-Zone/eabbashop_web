interface shopProduct{
    productID : string,
    thumbnail : string,
    productName : string,
    realPrice : number,
    AP : number,
    AW : number,
    AK : number,
    averageScore:number,
    reviewCnt:number
}
interface mainProductList{
    newProducts:shopProduct[],
    bestProducts:shopProduct[],
    randomProducts:shopProduct[]
}

interface shopProductList{
    totalCount : number,
    list : shopProduct[]
}

interface product{
    productID : string,
    productName : string,
    sellerName : string,
    stock : number,
    activeYN : string
}

interface registProduct{
    name : string,
    thumbnail : string,
    realPrice:number,
    taxFreePrice : number,
    spPrice : number,
    stock : number,
    summary : string,
    description : string,
    paybackRatio : number,
    allowNation : string,
    categoryId : string,
    viewSite : string,
    showYN : string,
    activeYN : string
}

interface modifyProduct extends registProduct{
    productID : string,
}

interface productList{
    totalCount : number,
    list : product[]
}

interface productDetailAndSeller{
    product : productDetail,
    seller : productSeller
}

interface productDetail extends Omit<product, 'sellerName'>{
    thumbnail: string,
    categoryId:string
    categoryName: string
    sellerId:string,
    taxFreePrice : number,
    spPrice : number,
    realPrice : number,
    description : string,
    summary : string,
    paybackRatio : number,
    categories : category[],
    allowNation : string[],
    viewSite : string,
    showYN : string
}

interface productSeller extends seller{
    host : string,
    email : string
}

interface reviewList{
    totalCount : number,
    list : review[],
}

interface review{
    productReviewId : string,
    score : number,
    comment : string,
    like : number,
    dislike : number,
    createdDateTime : string,
    name : string
}

interface searchParams{
    page: number,
    size: number,
    orderBy: string,
    orderByType: string,
    params : string[],
    values : string[],
}
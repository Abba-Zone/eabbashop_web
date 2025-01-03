interface shopProduct{
    productID : string,
    thumbnail : string,
    name : string,
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

interface product{
    productID : string,
    name : string,
    seller : string,
    stock : number,
    activeYN : string
}

interface registProduct{
    name : string,
    thumbnail : string,
    taxFreePrice : number,
    SPPrice : number,
    stock : number,
    summary : string,
    description : string,
    paybackRatio : number,
    allowNation : string[],
    categories : string[],
    viewSite : string,
    showYN : string,
    activeYN : string
}

interface modifyProduct{
    productID : string,
    name : string,
    thumbnail : string,
    taxFreePrice : number,
    SPPrice : number,
    stock : number,
    summary : string,
    description : string,
    paybackRatio : number,
    allowNation : string[],
    categories : string[],
    viewSite : string,
    showYN : string,
    activeYN : string
}

interface productList{
    totalCount : number,
    list : product[]
}

interface productDetailAndSeller{
    product : productDetail,
    seller : productSeller
}

interface productDetail extends Omit<product, 'seller'>{
    thumbnail: string,
    taxFreePrice : number,
    SPPrice : number,
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

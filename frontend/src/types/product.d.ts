interface product{
    productID : string,
    name : string,
    seller : string,
    stock : number,
    activeYN : boolean
}

interface productList{
    totalProduct : number,
    products : product[]
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
    categories : string[],
    allowNation : string[],
    viewSite : string,
    showYN : boolean
}

interface productSeller extends seller{
    host : string,
    email : string
}

interface reviewList{
    totalReview : number,
    reviews : review[],
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

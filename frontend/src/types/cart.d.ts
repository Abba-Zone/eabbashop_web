interface cartInfo{
    cartID : string,
    productId : string,
    thumbnail : string,
    name : string,
    stock : number,
    quantity : number,
    realPrice : number,
    SP : number,
    AK : number
    selectYN : boolean,
}

interface cartList{
    totalCount:number,
    list : cartInfo[]
}

interface wishlist{
    wishlistID: string
    name: string,
    thumbnail: string,
    AK: number,
    LP: number,
    SP: number,
    realPrice: number,
    productID: string,
}

interface wishlistList{
    totalCount:number,
    list : wishlist[]
}
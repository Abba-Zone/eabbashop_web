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
    products : cartInfo[]
}
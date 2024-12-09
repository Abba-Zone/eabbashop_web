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

interface productDetail extends product{

}

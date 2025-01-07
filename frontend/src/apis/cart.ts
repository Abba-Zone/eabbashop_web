import { getData, postData } from './mainApi'

export const registToCart = (productId:string, quantity:number) => {
    /* real code*/
    postData<{message:string}>('/cart/register', {productId : productId, quantity : quantity})
        .then((data:any) => {
            console.log(data);
        }
    );
}
export const getCartList = ():cartList => {
    /* real code*/
    getData<cartList>('/cart/list')
        .then((data:any) => {
            return data;
        }
    );
    return null as unknown as cartList;
    /* make for test*/
    // var result :cartList = {
    //     products:[
    //         {cartID : "11q23qw314w4er4",productId : "13qw3qwe12e2e1we1w31",thumbnail : "https://fedqdwseqses.qseqs.qe.qseqseq.seqe",name : "물병",stock : 4,quantity : 2,realPrice : 10.0,SP : 1.0,AK : 1.0, selectYN : true},
    //         {cartID : "21q23qw314w4er4",productId : "23qw3qwe12e2e1we1w31",thumbnail : "https://fedqdwseqses.qseqs.qe.qseqseq.seqe",name : "물병",stock : 4,quantity : 2,realPrice : 10.0,SP : 1.0,AK : 1.0, selectYN : false},
    //         {cartID : "31q23qw314w4er4",productId : "33qw3qwe12e2e1we1w31",thumbnail : "https://fedqdwseqses.qseqs.qe.qseqseq.seqe",name : "물병",stock : 4,quantity : 2,realPrice : 10.0,SP : 1.0,AK : 1.0, selectYN : false},
    //         {cartID : "41q23qw314w4er4",productId : "43qw3qwe12e2e1we1w31",thumbnail : "https://fedqdwseqses.qseqs.qe.qseqseq.seqe",name : "물병",stock : 4,quantity : 2,realPrice : 10.0,SP : 1.0,AK : 1.0, selectYN : true},
    //     ]
    // };
    // return result;
}
export const changeQuantity = (cartID:string, quantity:number):void => {
    postData<{message:string}>('/cart/update', {cartID : cartID, quantity : quantity})
        .then((data:any) => {
            console.log(data);
        }
    );
}
export const selectCart = (cartID:string, selectYN:boolean):void => {
    postData<{message:string}>('/cart/select', {cartID : cartID, selectYN : selectYN})
        .then((data:any) => {
            console.log(data);
        }
    );
}
export const deleteCart = (cartID:string):void => {
    postData<{message:string}>('/cart/delete', {cartID : cartID})
        .then((data:any) => {
            console.log(data);
        }
    );
}


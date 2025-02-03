import { getData, postData } from './mainApi'

export const registToCart = (productID:string, quantity:number) => {
    /* real code*/
    postData<{message:string}>('/cart/register', {productID : productID, quantity : quantity})
        .then((data:any) => {
            console.log(data);
        }
    );
}
export const getCartList = async ():Promise<cartList> => {
    /* real code*/
    try {
        const response = await getData<cartList>(
            '/cart/list'
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board detail:', error);
        throw error;
    }
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


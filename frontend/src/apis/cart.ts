import { getData, postData } from './mainApi'

export const registToCart = (productId:string, quantity:number) => {
    /* real code*/
    postData<reviewList>('/cart/register', {productId : productId, quantity : quantity})
        .then((data:any) => {
            // return data.result;
        }
    );
}
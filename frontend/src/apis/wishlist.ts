import { getData, postData } from './mainApi'

export const registToWishlist = (productID:string) => {
    /* real code*/
    postData<{message:string}>('/wishlist/register', {productID : productID})
        .then((data:any) => {
            console.log(data);
        }
    );
}

export const getWishList = async ():Promise<shopProductList> => {
    /* real code*/
    try {
        const response = await getData<shopProductList>(
            '/wishlist/list'
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching board detail:', error);
        throw error;
    }
}

export const deleteToWishlist = (productID:string) => {
    /* real code*/
    postData<{message:string}>('/wishlist/delete', {productID : productID})
        .then((data:any) => {
            console.log(data);
        }
    );
}

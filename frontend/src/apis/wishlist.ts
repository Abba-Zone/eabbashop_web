import { getData, postData } from './mainApi'

export const registToWishlist = (productID:string) => {
    /* real code*/
    postData<{message:string}>('/wishlist/register', {productID : productID})
        .then((data:any) => {
            console.log(data);
        }
    );
}

export const getWishList = async ():Promise<wishlistList> => {
    /* real code*/
    try {
        const response = await getData<wishlistList>(
            '/wishlist/list'
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
    }
}

export const deleteToWishlist = (wishlistID:string, productID:string) => {
    /* real code*/
    postData<{message:string}>('/wishlist/delete', {wishlistID:wishlistID, productID : productID})
        .then((data:any) => {
            console.log(data);
        }
    );
}

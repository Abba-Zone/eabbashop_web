import { getWishList, deleteToWishlist, registToWishlist } from '../apis/wishlist'

export const getWishList_s = async ():Promise<wishlistList> => {
    return await getWishList();
}
export const deleteToWishlist_s = async (wishlistID:string, productID:string) => {
    return await deleteToWishlist(wishlistID, productID);
}
export const registToWishlist_s = async (productID:string) => {
    return await registToWishlist(productID);
}


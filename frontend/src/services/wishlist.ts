import { getWishList, deleteToWishlist, registToWishlist } from '../apis/wishlist'

export const getWishList_s = async ():Promise<shopProductList> => {
    return await getWishList();
}
export const deleteToWishlist_s = async (productID:string) => {
    return await deleteToWishlist(productID);
}
export const registToWishlist_s = async (productID:string) => {
    return await registToWishlist(productID);
}


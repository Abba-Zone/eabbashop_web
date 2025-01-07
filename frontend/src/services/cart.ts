import { registToCart, getCartList, changeQuantity, selectCart, deleteCart} from '../apis/cart'

export const registToCart_s = async (productId:string, quantity:number) => {
    await registToCart(productId, quantity);
}

export const getCartList_s = async ():Promise<cartList> => {
    return await getCartList();
}
export const changeQuantity_s = async (cartID:string, quantity:number):Promise<void> => {
    return await changeQuantity(cartID, quantity);
}
export const selectCart_s = async (cartID:string, selectYN:boolean):Promise<void> => {
    return await selectCart(cartID, selectYN);
}
export const deleteCart_s = async (cartID:string):Promise<void> => {
    return await deleteCart(cartID);
}
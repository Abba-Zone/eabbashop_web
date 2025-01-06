import { registToCart } from '../apis/cart'

export const registToCart_s = async (productId:string, quantity:number) => {
    await registToCart(productId, quantity);
}
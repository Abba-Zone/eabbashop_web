import { deleteToWishlist_s, registToWishlist_s } from "../../../services/wishlist";
import StarMark from "./StarMark";

interface Props{
    productInfo:productDetail,
    changeWishList():void
}

const ProductInfo:React.FC<Props> = ({productInfo, changeWishList}) => {
    const clickWhishlistButton = () => {
        if (productInfo.isWishList){
            deleteToWishlist_s(null as unknown as string, productInfo.productID);
        }else{
            registToWishlist_s(productInfo.productID);
        }
        changeWishList();
    }
    return (
        <div >
            <img src={productInfo.thumbnail}/>
            <div>{productInfo.productName}<button onClick={clickWhishlistButton}>{productInfo.isWishList?"♥":"♡"}</button></div>
            <StarMark scores={3}></StarMark>
            <span>리뷰수</span>
            <div>재고 : {productInfo.stock===0?"없음":"있음"}</div>
            <div>{productInfo.summary}</div>
            <div>가격 : ${productInfo.realPrice} {productInfo.spPrice}AP {productInfo.paybackRatio}AW</div>
        </div>
    );
}
    
export default ProductInfo;

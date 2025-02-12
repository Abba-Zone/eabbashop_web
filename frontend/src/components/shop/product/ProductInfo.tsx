import { deleteToWishlist_s, registToWishlist_s } from "../../../services/wishlist";
import StarMark from "./StarMark";

interface Props{
    productInfo:productDetail,
}

const ProductInfo:React.FC<Props> = ({productInfo}) => {
    const clickWhishlistButton = () => {
        const type = true;
        console.log(productInfo);
        if (type){
            registToWishlist_s(productInfo.productID);
        }else{
            deleteToWishlist_s(productInfo.productID);
        }
    }
    return (
        <div >
            <img src={productInfo.thumbnail}/>
            <div>{productInfo.productName}<button onClick={clickWhishlistButton}>♡</button></div>
            <StarMark scores={3}></StarMark>
            <span>리뷰수</span>
            <div>재고 : {productInfo.stock===0?"없음":"있음"}</div>
            <div>{productInfo.summary}</div>
            <div>가격 : ${productInfo.realPrice} {productInfo.spPrice}AP {productInfo.paybackRatio}AW</div>
        </div>
    );
}
    
export default ProductInfo;

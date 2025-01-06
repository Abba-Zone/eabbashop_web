import StarMark from "./StarMark";

interface Props{
    productInfo:productDetail,
}

const ProductInfo:React.FC<Props> = ({productInfo}) => {
    return (
        <div >
            <img src={productInfo.thumbnail}/>
            <div>{productInfo.name}</div>
            <StarMark scores={3}></StarMark>
            <span>리뷰수</span>
            <div>재고 : {productInfo.stock===0?"없음":"있음"}</div>
            <div>{productInfo.summary}</div>
            <div>가격 : ${productInfo.realPrice} {productInfo.SPPrice}AP {productInfo.paybackRatio}AW</div>
        </div>
    );
}
    
export default ProductInfo;

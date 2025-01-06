import { useNavigate } from "react-router-dom";
import StarMark from "./StarMark";

interface Props{
    product:shopProduct;
}

const ProductCard:React.FC<Props> = ({product}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>{navigate(`/productdetail/${product.productID}`)}}>
            <img src={product.thumbnail} alt="상품이미지" />
            <div>{product.name}</div>
            <div>US${product.realPrice}</div>
            <div>{product.AP}AP</div>
            <div>{product.AW}AW</div>
            <div>{product.AK}AK</div>
            <StarMark scores={product.averageScore}/>
        </div>
    );
}
    
export default ProductCard;

import { useNavigate } from "react-router-dom";

interface Props{
    product:shopProduct;
}

const ProductCard:React.FC<Props> = ({product}) => {
    const navigate = useNavigate();
    const makeStar = (score:number):JSX.Element[] => {
        const result : JSX.Element[] =[];
        for(let i = 0 ; i < 5;i++){
            if(score >= 1)
                result.push(<span key={i} style={{color:'orange'}}>★</span>)
            else
                result.push(<span key={i} style={{color:'gray'}}>★</span>)
            score--;
        }
        return result;
    }
    return (
        <div onClick={()=>{navigate(`/productdetail/${product.productID}`)}}>
            <img src={product.thumbnail} alt="상품이미지" />
            <div>{product.name}</div>
            <div>US${product.realPrice}</div>
            <div>{product.AP}AP</div>
            <div>{product.AW}AW</div>
            <div>{product.AK}AK</div>
            <div>{makeStar(product.averageScore)}({product.reviewCnt})</div>
        </div>
    );
}
    
export default ProductCard;

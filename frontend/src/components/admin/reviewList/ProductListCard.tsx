import { useNavigate } from "react-router-dom";

interface Props{
  product:product;
  }
  const ProductListCard:React.FC<Props> = ({product}) => {
    const navigate = useNavigate();
    return (
      <tr onClick={()=>{navigate(`/admin/review/${product.productID}`)}}>
        <td>선택</td>
        <td>{product.productName}</td>
        <td>{product.sellerName}</td>
        <td>{product.stock}</td>
        <td>{product.showYN? '활성화' : '비활성화'}</td>
      </tr>
    );
}
    
export default ProductListCard;
    
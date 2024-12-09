import { useNavigate } from "react-router-dom";

interface Props{
  product:product;
  }
  const ProductListCard:React.FC<Props> = ({product}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/productdetail/${product.productID}`)}}>
          <td>선택</td>
          <td>{product.name}</td>
          <td>{product.seller}</td>
          <td>{product.stock}</td>
          <td>{product.activeYN? "활성화" : "비활성화"}</td>
        </tr>
      );
}
    
export default ProductListCard;
    
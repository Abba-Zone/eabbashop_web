import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props{
  product:product;
  }
  const ProductListCard:React.FC<Props> = ({product}) => {
    const { t } = useTranslation();
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/productdetail/${product.productID}`)}}>
          <td>선택</td>
          <td>{product.name}</td>
          <td>{product.seller}</td>
          <td>{product.stock}</td>
          <td>{product.activeYN? t("AdminProduct:List.Filter04") : t("AdminProduct:List.Filter05")}</td>
        </tr>
      );
}
    
export default ProductListCard;
    
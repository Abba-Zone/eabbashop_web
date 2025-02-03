import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props{
  product:product;
  }
  const StoreProductListCard:React.FC<Props> = ({product}) => {
    const { t } = useTranslation();
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/productdetail/${product.productID}`)}}>
          <td>선택</td>
          <td>{product.productName}</td>
          <td>{product.stock}</td>
          <td>{product.activeYN? t("AdminProduct:List.Option04.Attribute01") : t("AdminProduct:List.Option04.Attribute02")}</td>
        </tr>
      );
}
    
export default StoreProductListCard;
    
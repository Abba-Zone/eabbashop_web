import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props{
    order:regularOrderInfo,
  }
  const AdminOrderInfo:React.FC<Props> = ({order}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
      <div>
        <h3>{t("AdminRegularOrder:Detail.Item01.Title")}</h3>
        <div onClick={()=>{navigate(`/admin/productdetail/${order.productID}`)}}><div>{t("AdminRegularOrder:Detail.Item01.Attribute01")}</div><div>{order.productName}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item01.Attribute02")}</div><div>{order.period}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item01.Attribute03")}</div><div>{order.quantity}</div></div>
        <div><div>{t("AdminRegularOrder:Detail.Item01.Attribute04")}</div><div>{order.createdDateTime}</div></div>
      </div>
    );
  }
    
  export default AdminOrderInfo;
    
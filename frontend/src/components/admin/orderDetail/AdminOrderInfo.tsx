import { useTranslation } from "react-i18next";

interface Props{
    order:orderOrder,
  }
  const AdminOrderInfo:React.FC<Props> = ({order}) => {
    const { t } = useTranslation();
      return (
        <div>
          <h3>{t("AdminOrder:Detail.Item01.Title")}</h3>
          <div><div>{t("AdminOrder:Detail.Item01.Attribute01")}</div><div>{order.productName}</div></div>
          <div><div>{t("AdminOrder:Detail.Item01.Attribute02")}</div><div>{order.quantity}</div></div>
          <div><div>{t("AdminOrder:Detail.Item01.Attribute03")}</div><div>{order.status}</div></div>
          <div><div>{t("AdminOrder:Detail.Item01.Attribute04")}</div><div>{order.결제방식}</div></div>
          <div><div>{t("AdminOrder:Detail.Item01.Attribute05")}</div><div>{order.createdDateTime}</div></div>
        </div>
      );
  }
    
  export default AdminOrderInfo;
    
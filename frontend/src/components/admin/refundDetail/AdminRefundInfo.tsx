import { useTranslation } from "react-i18next";

interface Props{
  refundInfo:refundDetail,
}
const AdminRefundInfo:React.FC<Props> = ({refundInfo}) => {
  const { t } = useTranslation();
  return (
    <div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute01")}</div><div>{refundInfo.lastName}{refundInfo.firstName}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute02")}</div><div>{refundInfo.phone}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute03")}</div><div>{refundInfo.orderDetailID}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute04")}</div><div>{refundInfo.createdDateTime}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute05")}</div><div>{refundInfo.status}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute06")}</div><div>{refundInfo.type === 100? t("AdminRefund:Detail.Item01.Option06.Attribute01"):t("AdminRefund:Detail.Item01.Option06.Attribute02")}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute07")}</div><div>{refundInfo.productName}</div></div>
      <div><div>{t("AdminRefund:Detail.Item01.Attribute08")}</div><div>{refundInfo.quantity}</div></div>
    </div>
  );
}
  
export default AdminRefundInfo;
  
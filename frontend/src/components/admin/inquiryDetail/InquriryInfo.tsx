import { useTranslation } from "react-i18next";

interface Props{
  inquiryInfo:inquiryDetail,
}
const InquriryInfo:React.FC<Props> = ({inquiryInfo}) => {
  const { t } = useTranslation();
    return (
      <div>
        <h3>{t("AdminInquiry:Detail.Item01.Title")}</h3>
        <div><div>{t("AdminInquiry:Detail.Item01.Attribute01")}</div><div>{inquiryInfo.name}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item01.Attribute02")}</div><div>{inquiryInfo.type}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item01.Attribute03")}</div><div>{inquiryInfo.content}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item01.Attribute04")}</div><div>{inquiryInfo.status}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item01.Attribute05")}</div><div>{inquiryInfo.createdDateTime}</div></div>
      </div>
    );
}
  
export default InquriryInfo;
  
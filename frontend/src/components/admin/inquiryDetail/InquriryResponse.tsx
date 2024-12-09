import { useTranslation } from "react-i18next";

interface Props{
  inquiryInfo:inquiryDetail,
}
const InquriryResponse:React.FC<Props> = ({inquiryInfo}) => {
  const { t } = useTranslation();
  if(inquiryInfo.status === '완료')
    return (
      <div>
        <h3>{t("AdminInquiry:Detail.Item02.Title")}</h3>
        <div><div>{t("AdminInquiry:Detail.Item02.Attribute01")}</div><div>{inquiryInfo.responseMember}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item02.Attribute02")}</div><div>{inquiryInfo.responseContent}</div></div>
        <div><div>{t("AdminInquiry:Detail.Item02.Attribute03")}</div><div>{inquiryInfo.responseDateTime}</div></div>
      </div>
    );
  else
  return (
    <div>
      <h3>{t("AdminInquiry:Detail.Item02.Title")}</h3>
      <div><div>{t("AdminInquiry:Detail.Item02.Attribute01")}</div><div>없음</div></div>
      <div><div>{t("AdminInquiry:Detail.Item02.Attribute02")}</div><div>없음</div></div>
      <div><div>{t("AdminInquiry:Detail.Item02.Attribute03")}</div><div>없음</div></div>
    </div>
  );
}
  
export default InquriryResponse;
  
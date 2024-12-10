import { useTranslation } from "react-i18next";

interface Props{
  review:review;
  }
const MemberListCard:React.FC<Props> = ({review}) => {
  const { t } = useTranslation();
    return (
      <div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute01")}</div><div>{review.name}</div></div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute02")}</div><div>{review.score}</div></div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute03")}</div><div>{review.comment}</div></div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute04")}</div><div>{review.createdDateTime}</div></div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute05")}</div><div>{review.dislike}</div></div>
        <div><div>{t("AdminProduct:Detail.Item03.Attribute06")}</div><div>{review.like}</div></div>
      </div>
    );
}
    
export default MemberListCard;
    
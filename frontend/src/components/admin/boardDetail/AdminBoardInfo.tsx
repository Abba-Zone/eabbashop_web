import { useTranslation } from "react-i18next";
import ViewEditor from "../editor/ViewEditor";

interface Props{
  board:boardDetail,
}
const AdminBoardInfo:React.FC<Props> = ({board}) => {
    const { t } = useTranslation();
    return (
      <div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute01")}</div><div>{board.type}</div></div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute02")}</div><div>{board.name}</div></div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute03")}</div><div>{board.createDateTime}</div></div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute04")}</div><ViewEditor content={board.contents}/></div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute05")}</div><div>{board.topYN}</div></div>
        <div><div>{t("AdminBoard:Detail.Item01.Attribute06")}</div><div>{board.showYN}</div></div>
      </div>
    );
}
  
export default AdminBoardInfo;
  
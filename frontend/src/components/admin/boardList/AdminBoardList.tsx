import { useTranslation } from "react-i18next";
import ListCard from "./AdminBoardListCard";
interface Props{
  boards:board[],
  changeSort(sortName:string):void,
}

const AdminBoardList:React.FC<Props> = ({boards, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < boards.length; i++){
        result.push(<ListCard key={i} board={boards[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('title')}}>{t("AdminBoard:NoticeList.Filter01")}</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminBoard:NoticeList.Filter02")}</th>
      <th onClick={()=>{changeSort('TopYN')}}>{t("AdminBoard:NoticeList.Filter03")}</th>
      <th onClick={()=>{changeSort('ShowYN')}}>{t("AdminBoard:NoticeList.Filter04")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminBoard:NoticeList.Filter05")}</th>
    </tr>;
    return result;
  }
    return (
      <div>
        <table>
          <thead>
            {makeheader()}
          </thead>
          <tbody>
            {boards==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminBoardList;
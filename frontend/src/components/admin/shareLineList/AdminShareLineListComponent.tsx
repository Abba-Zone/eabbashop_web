import { useTranslation } from "react-i18next";
import ListCard from "./AdminShareLineListCard";
interface Props{
  shareLines:shareLine[],
  changeSort(sortName:string):void,
}

const AdminShareLineListComponent:React.FC<Props> = ({shareLines, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareLines.length; i++){
        result.push(<ListCard key={i} shareLine={shareLines[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminShareLine:List.Filter01")}</th>
      <th onClick={()=>{changeSort('email')}}>{t("AdminShareLine:List.Filter02")}</th>
      <th onClick={()=>{changeSort('phone')}}>{t("AdminShareLine:List.Filter03")}</th>
      <th onClick={()=>{changeSort('role')}}>{t("AdminShareLine:List.Filter04")}</th>
      <th onClick={()=>{changeSort('memberNM')}}>{t("AdminShareLine:List.Filter05")}</th>
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
            {shareLines==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareLineListComponent;
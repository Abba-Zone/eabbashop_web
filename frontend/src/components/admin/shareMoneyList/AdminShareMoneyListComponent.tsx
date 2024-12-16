import { useTranslation } from "react-i18next";
import ListCard from "./AdminShareMoneyListCard";
interface Props{
  shareMoneys:shareMoney[],
  changeSort(sortName:string):void,
}

const AdminShareMoneyListComponent:React.FC<Props> = ({shareMoneys, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareMoneys.length; i++){
        result.push(<ListCard key={i} shareMoney={shareMoneys[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('name')}}>{t("AdminShareMoney:List.Filter01")}</th>
      <th onClick={()=>{changeSort('email')}}>{t("AdminShareMoney:List.Filter02")}</th>
      <th onClick={()=>{changeSort('grade')}}>{t("AdminShareMoney:List.Filter03")}</th>
      <th onClick={()=>{changeSort('netAK')}}>{t("AdminShareMoney:List.Filter04")}</th>
      <th onClick={()=>{changeSort('role')}}>{t("AdminShareMoney:List.Filter05")}</th>
      <th onClick={()=>{changeSort('zonAK')}}>{t("AdminShareMoney:List.Filter06")}</th>
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
            {shareMoneys==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareMoneyListComponent;
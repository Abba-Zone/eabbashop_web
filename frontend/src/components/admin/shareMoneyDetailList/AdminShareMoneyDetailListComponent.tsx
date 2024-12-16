import { useTranslation } from "react-i18next";
import ListCard from "./AdminShareMoneyDetailList";
interface Props{
  shareMoneyDetails:shareMoneyDetail[],
  changeSort(sortName:string):void,
}

const AdminShareMoneyDetailListComponent:React.FC<Props> = ({shareMoneyDetails, changeSort}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < shareMoneyDetails.length; i++){
        result.push(<ListCard key={i} shareMoneyDetail={shareMoneyDetails[i]} ></ListCard>);
      }
      return result;
  }
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('platform')}}>net/{t("AdminShareMoney:Detail.Filter01")}</th>
      <th onClick={()=>{changeSort('rate')}}>{t("AdminShareMoney:Detail.Filter02")}</th>
      <th onClick={()=>{changeSort('money')}}>{t("AdminShareMoney:Detail.Filter03")}</th>
      <th onClick={()=>{changeSort('accumulation')}}>{t("AdminShareMoney:Detail.Filter04")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminShareMoney:Detail.Filter05")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminShareMoney:Detail.Filter06")}</th>
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
            {shareMoneyDetails==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminShareMoneyDetailListComponent;
import { useTranslation } from "react-i18next";
import ListCard from "./AdminChargeListCard";
interface Props{
  requests:pointHistoryInfo[],
  changeSort(sortName:string):void,
}

const AdminChargeListComponent:React.FC<Props> = ({requests, changeSort}) => {
  console.log("here", requests);
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < requests.length; i++){
        result.push(<ListCard key={i} request={requests[i]} ></ListCard>);
      }
      return result;
  }
  
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('requester')}}>{t("AdminTransfer:List.Filter01")}</th>
      <th onClick={()=>{changeSort('type')}}>{t("AdminTransfer:List.Filter02")}</th>
      <th onClick={()=>{changeSort('amount')}}>{t("AdminTransfer:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminTransfer:List.Filter04")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminTransfer:List.Filter05")}</th>
      <th></th>
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
            {requests==null? <tr></tr>: rendering()}
          </tbody>
        </table>
      </div>
    );
}
  
export default AdminChargeListComponent;

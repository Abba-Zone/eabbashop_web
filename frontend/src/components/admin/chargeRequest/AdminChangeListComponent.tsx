import { useTranslation } from "react-i18next";
import { AdminChangeListCard } from "../../../components";
interface Props{
  requests:pointHistoryInfo[],
  changeSort(sortName:string):void,
  onRowClick(chargeRefundId:string):void,
  onReject(chargeRefundId:string, status:string):void,
  onApprove(chargeRefundId:string, status:string):void,
}

const AdminChangeListComponent:React.FC<Props> = ({requests, changeSort, onRowClick, onReject, onApprove}) => {
  const { t } = useTranslation();
  const rendering = (): JSX.Element[] => {
      const result = [];
      for(let i = 0 ; i < requests.length; i++){
        result.push(<AdminChangeListCard key={i} request={requests[i]} onRowClick={onRowClick} onReject={onReject} onApprove={onApprove}></AdminChangeListCard>);
      }
      return result;
  }
  
  const makeheader = (): JSX.Element => {
    const result = 
    <tr>
      <th>선택</th>
      <th onClick={()=>{changeSort('requester')}}>{t("AdminChargeRequest:List.Filter01")}</th>
      <th onClick={()=>{changeSort('type')}}>{t("AdminChargeRequest:List.Filter02")}</th>
      <th onClick={()=>{changeSort('point')}}>{t("AdminChargeRequest:List.Filter03")}</th>
      <th onClick={()=>{changeSort('createdDateTime')}}>{t("AdminChargeRequest:List.Filter04")}</th>
      <th onClick={()=>{changeSort('status')}}>{t("AdminChargeRequest:List.Filter05")}</th>
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
  
export default AdminChangeListComponent;

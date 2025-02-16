import { useTranslation } from "react-i18next";

interface Props{
  request:pointHistoryInfo;
  onRowClick: (chargeRefundId: string) => void;
  onReject: (chargeRefundId: string, status:string) => void;
  onApprove: (chargeRefundId: string, status:string) => void;
  }
  const statusChange = {
    A: '충전 신청',
    B: '환급 신청',
    C: '충전 신청 취소',
    D: '환급 신청 취소',
    E: '충전 처리 완료',
    F: '환급 처리 완료',
    G: '충전 처리 거절',
    H: '환급 처리 거절',
  }
  const dateFormat = (requestDate:string):string => {
    const [date] = requestDate.split('T');
    return date;
  }
  const renderName = (request:pointHistoryInfo):string => {
    return request.member.lastName + request.member.firstName;
  }
  const isAbleApprove = (status: string) => {
    const chargeTypes = ['A', 'B'];
    return chargeTypes.includes(status);
  }
  const AdminChangeListCard:React.FC<Props> = ({request, onRowClick, onReject, onApprove}) => {
    const { t } = useTranslation();
    const button = (): JSX.Element => {
      if(isAbleApprove(request.status)){
        return(
          <div>
            <button onClick={() => onApprove(request.chargeRefundID, request.status)}>{t("AdminChargeRequest:List.Button01")}</button>
            <button onClick={() => onReject(request.chargeRefundID, request.status)}>{t("AdminChargeRequest:List.Button02")}</button>
          </div>
        );
      }else{
        return(
          request.status === 'E' || request.status === 'F' ?
          <div>
            <button disabled>{t("AdminChargeRequest:List.Button03")}</button>
          </div>
          : request.status === 'G' || request.status === 'H' ?
          <div>
            <button disabled>{t("AdminChargeRequest:List.Button04")}</button>
          </div>
          :
          <div>
            <button disabled>{t("AdminChargeRequest:List.Button05")}</button>
          </div>
        );
      }
        
    }
    return (
      <tr>
        <td><input type="checkbox" name="select"/></td>
        <td onClick={() => onRowClick(request.chargeRefundID)} style={{ cursor: 'pointer', color: '#2e508d' }}>{renderName(request)}</td>
        <td>{request.type}</td>
        <td>{request.point}</td>
        <td>{statusChange[request.status as keyof typeof statusChange]}</td>  
        <td>{dateFormat(request.createdDateTime)}</td>
        <td>{button()}</td>
      </tr>
    );
}
    
export default AdminChangeListCard;
    
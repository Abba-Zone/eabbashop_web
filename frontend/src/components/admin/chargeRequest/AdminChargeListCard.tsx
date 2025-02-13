import { useTranslation } from "react-i18next";

interface Props{
  request:pointHistoryInfo;
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
  const isCharge = (request:pointHistoryInfo):boolean => {
    if(request.status === 'A'){
      return true;
    }else{
      return false;
    }
  }
  const AdminChargeListCard:React.FC<Props> = ({request}) => {
    console.log("here", request);
    const { t } = useTranslation();
    const button = (): JSX.Element => {
      if(request.status === '완료'){
        return(
          <button>{t("AdminTransfer:List.Button02")}</button>
        );
      }else{
        return(
          <button>{t("AdminTransfer:List.Button01")}</button>
        );
      }
        
    }
    return (
      <tr>
        <td>선택</td>
        <td>{renderName(request)}</td>
        <td>{request.type}</td>
        <td>{isCharge(request) ? request.amount : request.point}</td>
        <td>{statusChange[request.status as keyof typeof statusChange]}</td>
        <td>{dateFormat(request.createdDateTime)}</td>
        <td>{button()}</td>
      </tr>
    );
}
    
export default AdminChargeListCard;
    
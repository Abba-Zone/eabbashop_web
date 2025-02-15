import { useNavigate } from "react-router-dom";

interface Props{
  history:historyDetail,
}

const HistoryDetailCharge:React.FC<Props> = ({history}) => {
  const navigate = useNavigate();
  return (
    <div>
      ChargeRefundID 정보 불러오기 생기면 추가
      {/* <button onClick={()=>{navigate(`/admin/refundDetail/${history.ChargeRefundID}`)}}>정보 가져오기</button> */}
    </div>
  );
}
export default HistoryDetailCharge;
import { useNavigate } from "react-router-dom";

interface Props{
  history:adminHistoryDetail,
}

const AdminHistoryDetailCharge:React.FC<Props> = ({history}) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>{navigate(`/admin/refundDetail/${history.ChargeRefundID}`)}}>정보 가져오기</button>
    </div>
  );
}
export default AdminHistoryDetailCharge;
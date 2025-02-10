import { useNavigate } from "react-router-dom";

interface Props{
  history:adminHistoryDetail,
}

const AdminHistoryDetailTransfer:React.FC<Props> = ({history}) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>{navigate(`/admin/shareMoneyDetail/${history.TransferID}`)}}>정보 가져오기</button>
    </div>
  );
}
export default AdminHistoryDetailTransfer;
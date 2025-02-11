import { useNavigate } from "react-router-dom";

interface Props{
  history:historyDetail,
}

const AdminHistoryDetailOrder:React.FC<Props> = ({history}) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>{navigate(`/admin/orderdetail/${history.OrderDetailID}`)}}>정보 가져오기</button>
    </div>
  );
}
export default AdminHistoryDetailOrder;
import { useNavigate } from "react-router-dom";

interface Props{
  history:historyDetail,
}

const HistoryDetailOrder:React.FC<Props> = ({history}) => {
  const navigate = useNavigate();
  return (
    <div>
      OrderDetailID로 정보 불러오기 생기면 추가
      {/* <button onClick={()=>{navigate(`/admin/orderdetail/${history.OrderDetailID}`)}}>정보 가져오기</button> */}
    </div>
  );
}
export default HistoryDetailOrder;
import { useNavigate } from "react-router-dom";

interface Props{
  history:adminHistory;
  }
  const AdminHistoryListCard:React.FC<Props> = ({history}) => {
      const navigate = useNavigate();
      return (
        <tr onClick={()=>{navigate(`/admin/walletdetail/${history.historyID}`)}}>
          <td>선택</td>
          <td>{history.pointType}</td>
          <td>{history.AK}</td>
          <td>{history.LP}</td>
          <td>{history.SP}</td>
          <td>{history.message}</td>
        </tr>
      );
}
    
export default AdminHistoryListCard;
    
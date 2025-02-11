import { useNavigate } from "react-router-dom";

interface Props{
  history:walletHistory,
}
const MyHistoryListCard:React.FC<Props> = ({history}) => {
    const navigate = useNavigate();
    return (
    <div onClick={()=>{navigate(`/mypage/transactiondetail/${history.historyID}`)}}>
        <div>{history.pointType}</div>
        <div>{history.message}</div>
        <div>{history.LP}LP</div>
        <div>{history.SP}SP</div>
        <div>{history.AK}AK</div>
    </div>
    );
}
    
export default MyHistoryListCard;

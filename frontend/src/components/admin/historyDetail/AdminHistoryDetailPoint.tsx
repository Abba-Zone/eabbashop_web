interface Props{
  history:historyDetail,
}

const AdminHistoryDetailPoint:React.FC<Props> = ({history}) => {
    return (
      <div>
        <h3>메모</h3>
        <div>{history.message||"없음"}</div>
        <h3>거래금액</h3>
        <div>{history.LP}</div>
        <div>{history.AK}</div>
        <div>{history.SP}</div>
        <h3>거래후 잔액</h3>
        <div>{history.LPBalance}</div>
        <div>{history.AKBalance}</div>
        <div>{history.SPBalance}</div>
        <h3>거래유형</h3>
        <div>{history.pointType}</div>
      </div>
    );
}
  
export default AdminHistoryDetailPoint;
interface Props{
  history:historyDetail,
}

const HistoryDetailPoint:React.FC<Props> = ({history}) => {
    return (
      <div>
        <h3>메모</h3>
        <div>{history.message||"없음"}</div>
        <h3>거래금액</h3>
        <div>{history.LP}LP</div>
        <div>{history.SP}SP</div>
        <div>{history.AK}AK</div>
        <h3>거래후 잔액</h3>
        <div>{history.LPBalance}LP</div>
        <div>{history.SPBalance}SP</div>
        <div>{history.AKBalance}AK</div>
        <h3>거래유형</h3>
        <div>{history.pointType}</div>
      </div>
    );
}
  
export default HistoryDetailPoint;
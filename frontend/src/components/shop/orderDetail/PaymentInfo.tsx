interface Props{
  addressInfo:shopOrderInfo,
}

const PaymentInfo:React.FC<Props> = ({addressInfo}) => {
  return (
    <div>
        <h1>결제 금액</h1>
        <div>사용 포인트</div>
        <div>{addressInfo.totalLP}</div>
        <div>SP포인트</div>
        <div>{addressInfo.totalSP}</div>
        <div>AW환급포인트</div>
        <div>{addressInfo.totalAK}</div>
        <div>총 결제 금액</div>
        <div>{addressInfo.totalRealPrice}</div>
    </div>
  );
}
  
export default PaymentInfo;